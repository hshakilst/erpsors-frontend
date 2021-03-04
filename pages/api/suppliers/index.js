import { db } from "@/libs/fauna";
import { query as q } from "faunadb";
import { SentryInitialize } from "@/libs/sentry";

SentryInitialize();

const createSupplier = (
  code,
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
    q.Create(q.Collection("suppliers"), {
      data: {
        code: code ?? "",
        company: company ?? "",
        name: name ?? "",
        type: type ?? "",
        opnBalance: opnBalance ?? "",
        // item:item ?? "",
        address: address ?? "",
        phone: phone ?? "",
        status: status ?? "",
        group: group ?? "",
        image: image ?? "",
        notes: notes ?? "",
      },
    })
  );
};

const getAllSuppliers = () => {
  return db.query(
    q.Map(
      q.Paginate(q.Match(q.Index("all_suppliers"))),
      q.Lambda(
        "supplierRef",
        q.Let(
          {
            supplierDoc: q.Get(q.Var("supplierRef")),
          },
          {
            id: q.Select(["ref", "id"], q.Var("supplierDoc")),
            code: q.Select(["data", "code"], q.Var("supplierDoc")),
            company: q.Select(["data", "company"], q.Var("supplierDoc")),
            name: q.Select(["data", "name"], q.Var("supplierDoc")),
            type: q.Select(["data", "type"], q.Var("supplierDoc")),
            opnBalance: q.Select(["data", "opnBalance"], q.Var("supplierDoc")),
            // item: q.Select(["data", "item"], q.Var("supplierDoc")),
            address: q.Select(["data", "address"], q.Var("supplierDoc")),
            phone: q.Select(["data", "phone"], q.Var("supplierDoc")),
            status: q.Select(["data", "status"], q.Var("supplierDoc")),
            group: q.Select(["data", "group"], q.Var("supplierDoc")),
            image: q.Select(["data", "image"], q.Var("supplierDoc")),
            notes: q.Select(["data", "notes"], q.Var("supplierDoc")),
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
        const query = await getAllSuppliers();
        res.status(200).json(query.data);
        break;
      case "POST":
        const {
          code,
          company,
          name,
          type,
          opnBalance,
          item,
          address,
          phone,
          status,
          group,
          image,
          notes,
        } = req.body;

        const result = await createSupplier(
          code,
          company,
          name,
          type,
          opnBalance,
          item,
          address,
          phone,
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
