import { db } from "@/libs/fauna";
import { query as q } from "faunadb";
import { SentryInitialize } from "@/libs/sentry";

SentryInitialize();

const createStoreRequisition = (code, item, reqQty, warehouse, notes) => {
  return db.query(
    q.Create(q.Collection("store_requisitions"), {
      data: {
        code: code ?? "",
        item: item ?? "",
        reqQty: reqQty ?? "",
        warehouse: warehouse ?? "",
        notes: notes ?? "",
      },
    })
  );
};

const getAllStoreRequisitions = () => {
  return db.query(
    q.Map(
      q.Paginate(q.Match(q.Index("all_store_requisitions"))),
      q.Lambda(
        "storeReqRef",
        q.Let(
          {
            storeReqDoc: q.Get(q.Var("storeReqRef")),
          },
          {
            id: q.Select(["ref", "id"], q.Var("storeReqDoc")),
            code: q.Select(["data", "code"], q.Var("storeReqDoc")),
            item: q.Select(["data", "item"], q.Var("storeReqDoc")),
            reqQty: q.Select(["data", "reqQty"], q.Var("storeReqDoc")),
            warehouse: q.Select(["data", "warehouse"], q.Var("storeReqDoc")),
            notes: q.Select(["data", "notes"], q.Var("storeReqDoc")),
          }
        )
      )
    )
  );
};

export default async (req, res) => {
  try {
    const {
      query: { id, name },
      method,
    } = req;

    switch (method) {
      case "GET":
        //FIXME:Pagination support for ui table
        const query = await getAllStoreRequisitions();
        res.status(200).json(query.data);
        break;
      case "POST":
        const { code, item, reqQty, warehouse, notes } = req.body;

        const result = await createStoreRequisition(
          code,
          item,
          reqQty,
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
