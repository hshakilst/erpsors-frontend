import { db, getOpeningItemRateQtyById } from "@/libs/fauna";
import { query as q } from "faunadb";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { withSentry } from "@sentry/nextjs";

const createStoreReceipt = (
  code,
  poCode,
  item,
  opnRate,
  opnQty,
  valueRate,
  recQty,
  warehouse,
  notes,
  isPosted
) => {
  return db.query(
    q.Do(
      q.Create(q.Collection("store_receipts"), {
        data: {
          code: code ?? "",
          poCode: poCode ?? "",
          item: item ?? "",
          opnRate: opnRate ?? "",
          opnQty: opnQty ?? "",
          valueRate: valueRate ?? "",
          recQty: recQty ?? "",
          warehouse: warehouse ?? "",
          notes: notes ?? "",
          isPosted: isPosted ?? false,
        },
      }),
      q.Call("OnReceiveUpdateItem", item.id, recQty, valueRate)
    )
  );
};

const getAllStoreReceipts = () => {
  return db.query(
    q.Map(
      q.Paginate(q.Match(q.Index("all_store_receipts"))),
      q.Lambda(
        "docRef",
        q.Let(
          {
            doc: q.Get(q.Var("docRef")),
          },
          {
            id: q.Select(["ref", "id"], q.Var("doc")),
            code: q.Select(["data", "code"], q.Var("doc")),
            poCode: q.Select(["data", "poCode"], q.Var("doc")),
            item: q.Select(["data", "item"], q.Var("doc")),
            opnRate: q.Select(["data", "opnRate"], q.Var("doc")),
            opnQty: q.Select(["data", "opnQty"], q.Var("doc")),
            valueRate: q.Select(["data", "valueRate"], q.Var("doc")),
            recQty: q.Select(["data", "recQty"], q.Var("doc")),
            warehouse: q.Select(["data", "warehouse"], q.Var("doc")),
            notes: q.Select(["data", "notes"], q.Var("doc")),
            isPosted: q.Select(["data", "isPosted"], q.Var("doc")),
          }
        )
      )
    )
  );
};

const getAllStoreReceiptCodes = () => {
  return db.query(q.Paginate(q.Match(q.Index("all_store_receipt_codes"))));
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
          const query = await getAllStoreReceiptCodes();
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
          const query = await getAllStoreReceipts();
          res.status(200).json(query.data);
        } else {
          res.status(400).json({ error: true, data: "Bad Request" });
        }
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
          isPosted,
        } = req.body;

        const query = await getOpeningItemRateQtyById(item.id);
        const opnRate = query.data[0][0];
        const opnQty = query.data[0][1];

        const result = await createStoreReceipt(
          code,
          poCode,
          item,
          opnRate,
          opnQty,
          valueRate,
          recQty,
          warehouse,
          notes,
          isPosted
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
