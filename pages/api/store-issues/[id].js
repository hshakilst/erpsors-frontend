import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import {
  getStoreIssuesById,
  deleteStoreIssuesById,
  updateStoreIssuesById,
} from "@/fauna/store-issues";

const handler = withApiAuthRequired(async (req, res) => {
  try {
    const {
      query: { id },
      method,
    } = req;

    const { date, reqCode, item, issRate, issQty, warehouse, notes, isPosted } =
      req.body;

    switch (method) {
      case "GET":
        const query = await getStoreIssuesById(id);
        res.status(200).json(query.data);
        break;
      case "PATCH":
        const resUpdate = await updateStoreIssuesById({
          id,
          date,
          reqCode,
          item,
          issRate,
          issQty,
          warehouse,
          notes,
          isPosted,
        });
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
});

export default handler;
