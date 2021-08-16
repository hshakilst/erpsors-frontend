import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { createItemsLedger, getAllItemsLedger } from "@/fauna/items-ledger";

const handler = withApiAuthRequired(async (req, res) => {
  try {
    const { method } = req;

    switch (method) {
      case "GET":
        //FIXME:Pagination support for ui table
        const query = await getAllItemsLedger();
        res.status(200).json(query.data);
        break;
      case "POST":
        const {
          code, //store-receipts or store-issues codes
          type, //store-receipts or store-issues
          itemCode,
          opnRate,
          opnQty,
          recRate,
          recQty,
          issRate,
          issQty,
          warehouseCode,
          notes,
        } = req.body;

        const cloQty = Number(opnQty) + Number(recQty) - Number(issQty);
        const cloValue =
          Number(opnQty) * Number(opnRate) +
          Number(recQty) * Number(recRate) -
          Number(issQty) * Number(issRate);
        const cloRate = cloValue / cloQty;

        const result = await createItemsLedger({
          code,
          type,
          itemCode,
          opnRate,
          opnQty,
          recRate,
          recQty,
          issRate,
          issQty,
          cloRate,
          cloQty,
          warehouseCode,
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
