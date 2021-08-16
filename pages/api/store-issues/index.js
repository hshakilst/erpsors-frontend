import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { getOpeningItemRateQtyByCode } from "@/fauna/items";
import {
  createStoreIssue,
  getAllStoreIssues,
  getAllStoreIssueCodes,
} from "@/fauna/store-issues";

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
          const query = await getAllStoreIssueCodes();
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
          const query = await getAllStoreIssues();
          res.status(200).json(query.data);
        } else {
          res.status(400).json({ error: true, data: "Bad Request" });
        }
        break;
      case "POST":
        const { date, code, reqCode, item, issRate, issQty, warehouse, notes } =
          req.body;

        const query = await getOpeningItemRateQtyByCode(item);
        const opnRate = query.data[0][0];
        const opnQty = query.data[0][1];
        if (Number(opnQty) < Number(issQty)) {
          res.status(403).json({ error: false, data: "Insufficient quantity" });
        }
        const result = await createStoreIssue({
          date,
          code,
          reqCode,
          item,
          opnRate,
          opnQty,
          issRate,
          issQty,
          warehouse,
          notes,
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
