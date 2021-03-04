import { db } from "@/libs/fauna";
import { SentryInitialize } from "@/libs/sentry";
import { query as q } from "faunadb";

SentryInitialize();

const deleteItemById = (id) => {
  return db.query(q.Delete(q.Ref(q.Collection("items"), id)));
};

export default async (req, res) => {
  try {
    const {
      query: { id, name },
      method,
    } = req;

    switch (method) {
      case "GET":
        // Get data from your database
        res.status(200).json({ id, name: `User ${name}` });
        break;
      case "PUT":
        // Update or create data in your database
        res.status(200).json({ id, name: name || `User ${id}` });
        break;
      case "DELETE":
        const result = await deleteItemById(id);
        res.status(200).json({ error: false, data: result });
        break;
      default:
        res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: true, data: error });
  }
};
