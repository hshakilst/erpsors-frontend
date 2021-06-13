import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import {
  createWarehouse,
  getAllWarehouses,
  getAllWarehouseCodes,
} from "@/fauna/warehouses";

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
          const warehouseCodesQuery = await getAllWarehouseCodes();
          const warehouseCodes = [];

          warehouseCodesQuery.data.map((row) => {
            const warehouse = {
              id: row[0],
              code: row[1],
              name: row[2],
            };
            warehouseCodes.push(warehouse);
          });

          res.status(200).json(warehouseCodes);
        } else if (Object.keys(req.query).length === 0) {
          const query = await getAllWarehouses();
          res.status(200).json(query.data);
        } else {
          res.status(400).json({ error: true, data: "Bad Request" });
        }
        break;

      case "POST":
        const {
          code,
          name,
          type,
          // capacity,
          incharge,
          address,
          phone,
          status,
          group,
          image,
          notes,
        } = req.body;

        const result = await createWarehouse(
          code,
          name,
          type,
          // capacity,
          incharge,
          address,
          phone,
          status,
          group,
          image,
          notes
        );
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
