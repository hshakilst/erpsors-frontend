import { db } from "@/libs/fauna";
import { query as q } from "faunadb";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

const getPurchaseOrderById = (id) => {
  return db.query(q.Get(q.Ref(q.Collection("purchase_orders"), id)));
};

const deletePurchaseOrdersById = (id) => {
  return db.query(q.Delete(q.Ref(q.Collection("purchase_orders"), id)));
};

const updatePurchaseOrderById = ({
  id,
  reqCode,
  item,
  rate,
  appQty,
  supplier,
  purMode,
  creDays,
  purBy,
  notes,
  totalAmount,
  date,
}) => {
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
        totalAmount,
        date,
      },
    })
  );
};

const handler = withApiAuthRequired(async (req, res) => {
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
      totalAmount,
      date,
    } = req.body;

    switch (method) {
      case "GET":
        const query = await getPurchaseOrderById(id);
        res.status(200).json(query.data);
        break;
      case "PATCH":
        const resUpdate = await updatePurchaseOrderById({
          id,
          reqCode,
          item,
          rate,
          appQty,
          supplier,
          purMode,
          creDays,
          purBy,
          notes,
          totalAmount,
          date,
        });
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
});

export default handler;
