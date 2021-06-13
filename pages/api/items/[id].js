import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { getItemById, deleteItemById, updateItemById } from "@/fauna/items";

const handler = withApiAuthRequired(async (req, res) => {
  try {
    const {
      query: { id },
      method,
    } = req;

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

    switch (method) {
      case "GET":
        const itemQuery = await getItemById(id);
        res.status(200).json(itemQuery.data);
        break;
      case "PATCH":
        const resUpdate = await updateItemById({
          id,
          opnDate,
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
        res.status(200).json({ error: false, data: resUpdate });
        break;
      case "DELETE":
        const resDelete = await deleteItemById(id);
        res.status(200).json({ error: false, data: resDelete });
        break;
      default:
        res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: true, data: error });
  }
});

export default handler;
