import { createWarehouse, getAllWarehouses } from "@/libs/fauna";
import { SentryInitialize } from "@/libs/sentry";

SentryInitialize();

export default async (req, res) => {
  try {
    const {
      query: { id, name },
      method,
    } = req;

    switch (method) {
      case "GET":
        //FIXME:Pagination support for ui table
        const query = await getAllWarehouses();
        res.status(200).json(query.data);
        break;
      case "POST":
        const {
          code,
          name,
          type,
          capacity,
          items,
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
          capacity,
          items,
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
};
