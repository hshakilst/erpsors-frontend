import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { getOpeningItemRateQtyByCode } from "@/fauna/items";
import {
  createStoreReceipt,
  getAllStoreReceipts,
  getAllStoreReceiptCodes,
} from "@/fauna/store-receipts";

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
          const query = await getAllStoreReceiptCodes();
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
          const query = await getAllStoreReceipts();
          res.status(200).json(query.data);
        } else {
          res.status(400).json({ error: true, data: "Bad Request" });
        }
        break;
      case "POST":
        const { date, code, poCode, item, recRate, recQty, warehouse, notes } =
          req.body;

        const query = await getOpeningItemRateQtyByCode(item);
        const opnRate = query.data[0][0];
        const opnQty = query.data[0][1];

        const result = await createStoreReceipt({
          date,
          code,
          poCode,
          item,
          opnRate,
          opnQty,
          recRate,
          recQty,
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
