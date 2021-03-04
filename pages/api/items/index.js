import { db } from "@/libs/fauna";
import { SentryInitialize } from "@/libs/sentry";
import { query as q } from "faunadb";

SentryInitialize();

const createItem = (
  code,
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
    q.Create(q.Collection("items"), {
      data: {
        code: code ?? "",
        name: name ?? "",
        type: type ?? "",
        opnQty: opnQty ?? "",
        priceRate: priceRate ?? "",
        valueRate: valueRate ?? "",
        unit: unit ?? "",
        warehouse: warehouse ?? "",
        status: status ?? "",
        group: group ?? "",
        image: image ?? "",
        notes: notes ?? "",
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
            code: q.Select(["data", "code"], q.Var("itemDoc")),
            name: q.Select(["data", "name"], q.Var("itemDoc")),
            type: q.Select(["data", "type"], q.Var("itemDoc")),
            opnQty: q.Select(["data", "opnQty"], q.Var("itemDoc")),
            priceRate: q.Select(["data", "priceRate"], q.Var("itemDoc")),
            valueRate: q.Select(["data", "valueRate"], q.Var("itemDoc")),
            unit: q.Select(["data", "unit"], q.Var("itemDoc")),
            warehouse: q.Select(["data", "warehouse"], q.Var("itemDoc")),
            status: q.Select(["data", "status"], q.Var("itemDoc")),
            group: q.Select(["data", "group"], q.Var("itemDoc")),
            image: q.Select(["data", "image"], q.Var("itemDoc")),
            notes: q.Select(["data", "notes"], q.Var("itemDoc")),
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
        const itemsQuery = await getAllItems();
        res.status(200).json(itemsQuery.data);
        break;
      case "POST":
        const {
          code,
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

        const result = await createItem(
          code,
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
