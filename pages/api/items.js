import { createItem, getAllItems } from "@/libs/fauna";

export default async (req, res) => {
  try {
    const {
      query: { id, name },
      method,
    } = req;

    switch (method) {
      case "GET":
        //FIXME:Pagination support for ui table
        const itemsQuery = await getAllItems();
        res.status(200).json(itemsQuery.data);
        break;
      case "POST":
        const {
          code,
          name,
          type,
          opnQty,
          priceRate,
          valueRate,
          unit,
          warehouse,
          status,
          group,
          image,
          notes,
        } = req.body;

        const result = await createItem(
          code,
          name,
          type,
          opnQty,
          priceRate,
          valueRate,
          unit,
          warehouse,
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
