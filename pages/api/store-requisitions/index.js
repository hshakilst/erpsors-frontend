import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import {
  createStoreRequisition,
  getAllStoreRequisitions,
  getAllStoreRequisitionCodes,
} from "@/fauna/store-requisitions";

const handler = withApiAuthRequired(async (req, res) => {
  try {
    const {
      query: { filter },
      method,
    } = req;

    switch (method) {
      case "GET":
        //FIXME:Pagination support for ui table
        if (filter === "codes") {
          const query = await getAllStoreRequisitionCodes();
          const codes = [];
          query.data.map((row) => {
            const code = {
              id: row[0],
              code: row[1],
            };
            codes.push(code);
          });
          res.status(200).json(codes);
        } else if (Object.keys(req.query).length === 0) {
          const query = await getAllStoreRequisitions();
          res.status(200).json(query.data);
        } else {
          res.status(400).json({ error: true, data: "Bad Request" });
        }
        break;

      case "POST":
        const { code, item, reqQty, warehouse, notes, reqDate } = req.body;

        const result = await createStoreRequisition({
          code,
          item,
          reqQty,
          warehouse,
          notes,
          reqDate,
        });
        res.status(200).json({ error: false, data: result });
        break;
      default:
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: true, data: error });
  }
});

export default handler;
