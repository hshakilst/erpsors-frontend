import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import {
  getStoreRequisitionById,
  deleteStoreRequisitionById,
  updateStoreRequisitionById,
} from "@/fauna/store-requisitions";

const handler = withApiAuthRequired(async (req, res) => {
  try {
    const {
      query: { id },
      method,
    } = req;

    const { item, reqQty, warehouse, notes, reqDate } = req.body;

    switch (method) {
      case "GET":
        const query = await getStoreRequisitionById(id);
        res.status(200).json(query.data);
        break;
      case "PATCH":
        const resUpdate = await updateStoreRequisitionById({
          id,
          item,
          reqQty,
          warehouse,
          notes,
          reqDate,
        });
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
});

export default handler;
