import { createStoreReceipt, getAllStoreReceipts } from "@/libs/fauna";
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
        const query = await getAllStoreReceipts();
        res.status(200).json(query.data);
        break;
      case "POST":
        const {
          code,
          poCode,
          item,
          valueRate,
          recQty,
          warehouse,
          notes,
        } = req.body;

        const result = await createStoreReceipt(
          code,
          poCode,
          item,
          valueRate,
          recQty,
          warehouse,
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
