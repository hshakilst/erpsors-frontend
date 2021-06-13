import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import {
  getPurchaseOrderById,
  deletePurchaseOrdersById,
  updatePurchaseOrderById,
} from "@/fauna/purchase-orders";

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
