import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { createItem, getAllItems, getAllItemCodes } from "@/fauna/items";

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
          const itemCodesQuery = await getAllItemCodes();
          const itemCodes = [];
          itemCodesQuery.data.map((row) => {
            const item = {
              id: row[0],
              code: row[1],
              name: row[2],
            };
            itemCodes.push(item);
          });
          res.status(200).json(itemCodes);
        } else if (Object.keys(req.query).length === 0) {
          const itemsQuery = await getAllItems();

          res.status(200).json(itemsQuery.data);
        } else {
          res.status(400).json({ error: true, data: "Bad Request" });
        }
        break;

      case "POST":
        const {
          opnDate,
          code,
          name,
          type,
          qty,
          totalAmount,
          valueRate,
          unit,
          status,
          shelfLife,
          group,
          image,
          notes,
          warehouse,
          supplier,
        } = req.body;

        const result = await createItem({
          opnDate,
          code,
          name,
          type,
          qty,
          totalAmount,
          valueRate,
          unit,
          status,
          shelfLife,
          group,
          image,
          notes,
          warehouse,
          supplier,
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
