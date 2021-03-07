import { db } from "@/libs/fauna";
import { SentryInitialize } from "@/libs/sentry";
import { query as q } from "faunadb";

SentryInitialize();

const getItemById = (id) => {
  return db.query(q.Get(q.Ref(q.Collection("items"), id)));
};

const deleteItemById = (id) => {
  return db.query(q.Delete(q.Ref(q.Collection("items"), id)));
};

const updateItemById = (
  id,
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
) => {
  return db.query(
    q.Update(q.Ref(q.Collection("items"), id), {
      data: {
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

    switch (method) {
      case "GET":
        // Get data from your database
        res.status(200).json({ id, name: `User ${name}` });
        break;
      case "PATCH":
        const resUpdate = await updateItemById(
          id,
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
};
