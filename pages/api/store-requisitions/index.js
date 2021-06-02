import { db } from "@/libs/fauna";
import { query as q } from "faunadb";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { withSentry } from "@sentry/nextjs";

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

const getAllStoreRequisitionCodes = () => {
  return db.query(q.Paginate(q.Match(q.Index("all_store_requisition_codes"))));
};

export default withSentry(withApiAuthRequired(async (req, res) => {
  try {
    const {
      query: { filter },
      method,
    } = req;

    switch (method) {
      case "GET":
        //FIXME:Pagination support for ui table
        if (filter === "codes") {
          const query = await getAllStoreRequisitionCodes();
          const codes = [];
          query.data.map((row) => {
            const code = {
              id: row[0],
              code: row[1],
            };
            codes.push(code);
          });
          res.status(200).json(codes);
        } else if (Object.keys(req.query).length === 0) {
          const query = await getAllStoreRequisitions();
          res.status(200).json(query.data);
        } else {
          res.status(400).json({ error: true, data: "Bad Request" });
        }
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
}));
