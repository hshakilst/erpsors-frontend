import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import {
  getSupplierById,
  deleteSupplierById,
  updateSupplierById,
} from "@/fauna/suppliers";

const handler = withApiAuthRequired(async (req, res) => {
  try {
    const {
      query: { id },
      method,
    } = req;

    const {
      company,
      name,
      type,
      opnBalance,
      // item,
      address,
      phone,
      status,
      group,
      image,
      notes,
    } = req.body;

    switch (method) {
      case "GET":
        const query = await getSupplierById(id);
        res.status(200).json(query.data);
        break;
      case "PATCH":
        const resUpdate = await updateSupplierById(
          id,
          company,
          name,
          type,
          opnBalance,
          // item,
          address,
          phone,
          status,
          group,
          image,
          notes
        );
        res.status(200).json({ error: false, data: resUpdate });
        break;
      case "DELETE":
        const resDelete = await deleteSupplierById(id);
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
