import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import {
  getStoreReceiptById,
  deleteStoreReceiptById,
  updateStoreReceiptById,
} from "@/fauna/store-receipts";

const handler = withApiAuthRequired(async (req, res) => {
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
});

export default handler;
