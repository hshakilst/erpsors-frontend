import { db } from "@/libs/fauna";
import { query as q } from "faunadb";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

const createItem = ({
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
  supplier
}) => {
  return db.query(
    q.Create(q.Collection("items"), {
      data: {
        opnDate: opnDate ?? "",
        code: code ?? "",
        name: name ?? "",
        type: type ?? "",
        qty: qty ?? "",
        totalAmount: totalAmount ?? "",
        valueRate: valueRate ?? "",
        unit: unit ?? "",
        status: status ?? "",
        shelfLife: shelfLife ?? "",
        group: group ?? "",
        image: image ?? "",
        notes: notes ?? "",
        warehouse: warehouse ?? "",
        supplier: supplier ?? ""
      },
    })
  );
};

const getAllItems = () => {
  return db.query(
    q.Map(
      q.Paginate(q.Match(q.Index("all_items"))),
      q.Lambda(
        "itemRef",
        q.Let(
          {
            itemDoc: q.Get(q.Var("itemRef")),
          },
          {
            id: q.Select(["ref", "id"], q.Var("itemDoc")),
            opnDate: q.Select(["data", "opnDate"], q.Var("itemDoc")),
            code: q.Select(["data", "code"], q.Var("itemDoc")),
            name: q.Select(["data", "name"], q.Var("itemDoc")),
            type: q.Select(["data", "type"], q.Var("itemDoc")),
            qty: q.Select(["data", "qty"], q.Var("itemDoc")),
            totalAmount: q.Select(["data", "totalAmount"], q.Var("itemDoc")),
            valueRate: q.Select(["data", "valueRate"], q.Var("itemDoc")),
            unit: q.Select(["data", "unit"], q.Var("itemDoc")),
            status: q.Select(["data", "status"], q.Var("itemDoc")),
            shelfLife: q.Select(["data", "shelfLife"], q.Var("itemDoc")),
            group: q.Select(["data", "group"], q.Var("itemDoc")),
            image: q.Select(["data", "image"], q.Var("itemDoc")),
            notes: q.Select(["data", "notes"], q.Var("itemDoc")),
            warehouse: q.Select(["data", "warehouse"], q.Var("itemDoc")),
            supplier: q.Select(["data", "supplier"], q.Var("itemDoc")),
          }
        )
      )
    )
  );
};

const getAllItemCodes = () => {
  return db.query(q.Paginate(q.Match(q.Index("all_item_codes"))));
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
          const itemCodesQuery = await getAllItemCodes();
          const itemCodes = [];
          itemCodesQuery.data.map((row) => {
            const item = {
              id: row[0],
              code: row[1],
              name: row[2],
            };
            itemCodes.push(item);
          });
          res.status(200).json(itemCodes);
        } else if (Object.keys(req.query).length === 0) {
          const itemsQuery = await getAllItems();

          res.status(200).json(itemsQuery.data);
        } else {
          res.status(400).json({ error: true, data: "Bad Request" });
        }
        break;

      case "POST":
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
          supplier
        } = req.body;

        const result = await createItem({
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
          supplier
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
