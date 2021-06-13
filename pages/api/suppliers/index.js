import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import {
  createSupplier,
  getAllSuppliers,
  getAllSupplierCodes,
} from "@/fauna/suppliers";

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
          const query = await getAllSupplierCodes();
          const codes = [];
          query.data.map((row) => {
            const code = {
              id: row[0],
              code: row[1],
              name: row[2],
            };
            codes.push(code);
          });
          res.status(200).json(codes);
        } else if (Object.keys(req.query).length === 0) {
          const query = await getAllSuppliers();
          res.status(200).json(query.data);
        } else {
          res.status(400).json({ error: true, data: "Bad Request" });
        }
        break;

      case "POST":
        const {
          code,
          company,
          name,
          opnBalance,
          phone,
          address,
          type,
          status,
          group,
          image,
          notes,
        } = req.body;

        const result = await createSupplier(
          code,
          company,
          name,
          opnBalance,
          phone,
          address,
          type,
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
