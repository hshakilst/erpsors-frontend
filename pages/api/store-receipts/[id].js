import { db } from "@/libs/fauna";
import { query as q } from "faunadb";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { withSentry } from "@sentry/nextjs";

const getStoreReceiptById = (id) => {
  return db.query(q.Get(q.Ref(q.Collection("store_receipts"), id)));
};

const deleteStoreReceiptById = (id) => {
  return db.query(q.Delete(q.Ref(q.Collection("store_receipts"), id)));
};

const updateStoreReceiptById = (
  id,
  poCode,
  item,
  valueRate,
  recQty,
  warehouse,
  notes,
  isPosted
) => {
  return db.query(
    q.Update(q.Ref(q.Collection("store_receipts"), id), {
      data: {
        poCode,
        item,
        valueRate,
        recQty,
        warehouse,
        notes,
        isPosted,
      },
    })
  );
};

export default withSentry(withApiAuthRequired(async (req, res) => {
  try {
    const {
      query: { id },
      method,
    } = req;

    const { poCode, item, valueRate, recQty, warehouse, notes, isPosted } =
      req.body;

    switch (method) {
      case "GET":
        const query = await getStoreReceiptById(id);
        res.status(200).json(query.data);
        break;
      case "PATCH":
        const resUpdate = await updateStoreReceiptById(
          id,
          poCode,
          item,
          valueRate,
          recQty,
          warehouse,
          notes,
          isPosted
        );
        res.status(200).json({ error: false, data: resUpdate });
        break;
      case "DELETE":
        const resDelete = await deleteStoreReceiptById(id);
        res.status(200).json({ error: false, data: resDelete });
        break;
      default:
        res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: true, data: error });
  }
}));
