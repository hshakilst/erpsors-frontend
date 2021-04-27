import { db } from "@/libs/fauna";
import { SentryInitialize } from "@/libs/sentry";
import { query as q } from "faunadb";
import LogRocket from "logrocket";

LogRocket.init("ogzvmk/demo");
SentryInitialize();

const getSupplierById = (id) => {
  return db.query(q.Get(q.Ref(q.Collection("suppliers"), id)));
};

const deleteSupplierById = (id) => {
  return db.query(q.Delete(q.Ref(q.Collection("suppliers"), id)));
};

const updateSupplierById = (
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
) => {
  return db.query(
    q.Update(q.Ref(q.Collection("suppliers"), id), {
      data: {
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
      },
    })
  );
};

export default async (req, res) => {
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
};
