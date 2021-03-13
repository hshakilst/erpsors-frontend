import { db } from "@/libs/fauna";
import { SentryInitialize } from "@/libs/sentry";
import { query as q } from "faunadb";

SentryInitialize();

const getMaterialIssuesById = (id) => {
  return db.query(q.Get(q.Ref(q.Collection("material_issues"), id)));
};

const deleteMaterialIssuesById = (id) => {
  return db.query(q.Delete(q.Ref(q.Collection("material_issues"), id)));
};

const updateMaterialIssuesById = (
  id,
  reqCode,
  item,
  valueRate,
  issQty,
  warehouse,
  notes
) => {
  return db.query(
    q.Update(q.Ref(q.Collection("material_issues"), id), {
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
        const query = await getMaterialIssuesById(id);
        res.status(200).json(query.data);
        break;
      case "PATCH":
        const resUpdate = await updateMaterialIssuesById(
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
        const resDelete = await deleteMaterialIssuesById(id);
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
