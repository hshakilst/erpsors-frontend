import { db } from "@/libs/fauna";
import { SentryInitialize } from "@/libs/sentry";
import { query as q } from "faunadb";
// import LogRocket from "logrocket";

// LogRocket.init("ogzvmk/demo");
SentryInitialize();

const getPurchaseOrderById = (id) => {
  return db.query(q.Get(q.Ref(q.Collection("purchase_orders"), id)));
};

const deletePurchaseOrdersById = (id) => {
  return db.query(q.Delete(q.Ref(q.Collection("purchase_orders"), id)));
};

const updatePurchaseOrderById = (
  id,
  reqCode,
  item,
  rate,
  appQty,
  supplier,
  purMode,
  creDays,
  purBy,
  notes
) => {
  return db.query(
    q.Update(q.Ref(q.Collection("purchase_orders"), id), {
      data: {
        reqCode,
        item,
        rate,
        appQty,
        supplier,
        purMode,
        creDays,
        purBy,
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

    const {
      reqCode,
      item,
      rate,
      appQty,
      supplier,
      purMode,
      creDays,
      purBy,
      notes,
    } = req.body;

    switch (method) {
      case "GET":
        const query = await getPurchaseOrderById(id);
        res.status(200).json(query.data);
        break;
      case "PATCH":
        const resUpdate = await updatePurchaseOrderById(
          id,
          reqCode,
          item,
          rate,
          appQty,
          supplier,
          purMode,
          creDays,
          purBy,
          notes
        );
        res.status(200).json({ error: false, data: resUpdate });
        break;
      case "DELETE":
        const resDelete = await deletePurchaseOrdersById(id);
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
