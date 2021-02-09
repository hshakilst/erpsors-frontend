import { createSupplier, getAllSuppliers } from "@/libs/fauna";
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
        const query = await getAllSuppliers();
        res.status(200).json(query.data);
        break;
      case "POST":
        const {
          code,
          company,
          name,
          type,
          opnBalance,
          item,
          address,
          phone,
          status,
          group,
          image,
          notes,
        } = req.body;

        const result = await createSupplier(
          code,
          company,
          name,
          type,
          opnBalance,
          item,
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
