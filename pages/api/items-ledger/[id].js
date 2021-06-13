import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import {
  getItemLedgerById,
  deleteItemLedgerById,
  updateItemLedgerById,
} from "@/fauna/items-ledger";

const handler = withApiAuthRequired(async (req, res) => {
  try {
    const {
      query: { id },
      method,
    } = req;

    const { reqCode, item, valueRate, issQty, warehouse, notes, isPosted } =
      req.body;

    switch (method) {
      case "GET":
        const query = await getItemLedgerById(id);
        res.status(200).json(query.data);
        break;
      // case "PATCH":
      //   const resUpdate = await updateStoreIssuesById(
      //     id,
      //     reqCode,
      //     item,
      //     valueRate,
      //     issQty,
      //     warehouse,
      //     notes,
      //     isPosted
      //   );
      //   res.status(200).json({ error: false, data: resUpdate });
      //   break;
      case "DELETE":
        const resDelete = await deleteItemLedgerById(id);
        res.status(200).json({ error: false, data: resDelete });
        break;
      default:
        res.setHeader("Allow", ["GET", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: true, data: error });
  }
});

export default handler;
