import { db } from "@/libs/fauna";
import { SentryInitialize } from "@/libs/sentry";
import { query as q } from "faunadb";

SentryInitialize();

const getStoreIssuesById = (id) => {
  return db.query(q.Get(q.Ref(q.Collection("store_issues"), id)));
};

const deleteStoreIssuesById = (id) => {
  return db.query(q.Delete(q.Ref(q.Collection("store_issues"), id)));
};

const updateStoreIssuesById = (
  id,
  reqCode,
  item,
  valueRate,
  issQty,
  warehouse,
  notes
) => {
  return db.query(
    q.Update(q.Ref(q.Collection("store_issues"), id), {
      data: {
        reqCode,
        item,
        valueRate,
        issQty,
        warehouse,
        notes,
      },
    })
  );
};

export default async (req, res) => {
  try {
    const {
      query: { id },
      method,
    } = req;

    const { reqCode, item, valueRate, issQty, warehouse, notes } = req.body;

    switch (method) {
      case "GET":
        const query = await getStoreIssuesById(id);
        res.status(200).json(query.data);
        break;
      case "PATCH":
        const resUpdate = await updateStoreIssuesById(
          id,
          reqCode,
          item,
          valueRate,
          issQty,
          warehouse,
          notes
        );
        res.status(200).json({ error: false, data: resUpdate });
        break;
      case "DELETE":
        const resDelete = await deleteStoreIssuesById(id);
        res.status(200).json({ error: false, data: resDelete });
        break;
      default:
        res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: true, data: error });
  }
};
