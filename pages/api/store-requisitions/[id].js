import { db } from "@/libs/fauna";
import { SentryInitialize } from "@/libs/sentry";
import { query as q } from "faunadb";
// import LogRocket from "logrocket";

// LogRocket.init("ogzvmk/demo");
SentryInitialize();

const getStoreRequisitionById = (id) => {
  return db.query(q.Get(q.Ref(q.Collection("store_requisitions"), id)));
};

const deleteStoreRequisitionById = (id) => {
  return db.query(q.Delete(q.Ref(q.Collection("store_requisitions"), id)));
};

const updateStoreRequisitionById = (id, item, reqQty, warehouse, notes) => {
  return db.query(
    q.Update(q.Ref(q.Collection("store_requisitions"), id), {
      data: {
        item,
        reqQty,
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

    const { item, reqQty, warehouse, notes } = req.body;

    switch (method) {
      case "GET":
        const query = await getStoreRequisitionById(id);
        res.status(200).json(query.data);
        break;
      case "PATCH":
        const resUpdate = await updateStoreRequisitionById(
          id,
          item,
          reqQty,
          warehouse,
          notes
        );
        res.status(200).json({ error: false, data: resUpdate });
        break;
      case "DELETE":
        const resDelete = await deleteStoreRequisitionById(id);
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
