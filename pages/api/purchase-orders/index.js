import { db } from "@/libs/fauna";
import { query as q } from "faunadb";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

const createPurchaseOrder = ({
  code,
  reqCode,
  item,
  rate,
  appQty,
  supplier,
  purMode,
  creDays,
  purBy,
  warehouse,
  notes,
  totalAmount,
  date,
}) => {
  return db.query(
    q.Create(q.Collection("purchase_orders"), {
      data: {
        code: code ?? "",
        reqCode: reqCode ?? "",
        item: item ?? "",
        rate: rate ?? "",
        appQty: appQty ?? "",
        supplier: supplier ?? "",
        purMode: purMode ?? "",
        creDays: creDays ?? "",
        purBy: purBy ?? "",
        warehouse: warehouse ?? "",
        notes: notes ?? "",
        totalAmount: totalAmount ?? "",
        date: date ?? "",
      },
    })
  );
};

const getAllPurchaseOrders = () => {
  return db.query(
    q.Map(
      q.Paginate(q.Match(q.Index("all_purchase_orders"))),
      q.Lambda(
        "purOrderRef",
        q.Let(
          {
            purOrderDoc: q.Get(q.Var("purOrderRef")),
          },
          {
            id: q.Select(["ref", "id"], q.Var("purOrderDoc")),
            code: q.Select(["data", "code"], q.Var("purOrderDoc")),
            reqCode: q.Select(["data", "reqCode"], q.Var("purOrderDoc")),
            item: q.Select(["data", "item"], q.Var("purOrderDoc")),
            rate: q.Select(["data", "rate"], q.Var("purOrderDoc")),
            appQty: q.Select(["data", "appQty"], q.Var("purOrderDoc")),
            supplier: q.Select(["data", "supplier"], q.Var("purOrderDoc")),
            purMode: q.Select(["data", "purMode"], q.Var("purOrderDoc")),
            creDays: q.Select(["data", "creDays"], q.Var("purOrderDoc")),
            purBy: q.Select(["data", "purBy"], q.Var("purOrderDoc")),
            warehouse: q.Select(["data", "warehouse"], q.Var("purOrderDoc")),
            notes: q.Select(["data", "notes"], q.Var("purOrderDoc")),
            totalAmount: q.Select(
              ["data", "totalAmount"],
              q.Var("purOrderDoc")
            ),
            date: q.Select(["data", "date"], q.Var("purOrderDoc")),
          }
        )
      )
    )
  );
};

const getAllPurchaseOrderCodes = () => {
  return db.query(q.Paginate(q.Match(q.Index("all_purchase_order_codes"))));
};

const handler = withApiAuthRequired(async (req, res) => {
  try {
    const {
      query: { filter },
      method,
    } = req;

    switch (method) {
      case "GET":
        //FIXME:Pagination support for ui table
        if (filter === "codes") {
          const query = await getAllPurchaseOrderCodes();
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
          const query = await getAllPurchaseOrders();
          res.status(200).json(query.data);
        } else {
          res.status(400).json({ error: true, data: "Bad Request" });
        }
        break;
      case "POST":
        const {
          code,
          reqCode,
          item,
          rate,
          appQty,
          supplier,
          purMode,
          creDays,
          purBy,
          warehouse,
          notes,
          totalAmount,
          date,
        } = req.body;

        const result = await createPurchaseOrder({
          code,
          reqCode,
          item,
          rate,
          appQty,
          supplier,
          purMode,
          creDays,
          purBy,
          warehouse,
          notes,
          totalAmount,
          date,
        });
        res.status(200).json({ error: false, data: result });
        break;
      default:
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: true, data: error });
  }
});

export default handler;