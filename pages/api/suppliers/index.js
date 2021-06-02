import { db } from "@/libs/fauna";
import { query as q } from "faunadb";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { withSentry } from "@sentry/nextjs";

const createSupplier = (
  code,
  company,
  name,
  opnBalance,
  phone,
  address,
  type,
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
        opnBalance: opnBalance ?? "",
        phone: phone ?? "",
        address: address ?? "",
        type: type ?? "",
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
            opnBalance: q.Select(["data", "opnBalance"], q.Var("supplierDoc")),
            phone: q.Select(["data", "phone"], q.Var("supplierDoc")),
            address: q.Select(["data", "address"], q.Var("supplierDoc")),
            type: q.Select(["data", "type"], q.Var("supplierDoc")),
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

const getAllSupplierCodes = () => {
  return db.query(q.Paginate(q.Match(q.Index("all_supplier_codes"))));
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
          const query = await getAllSupplierCodes();
          const codes = [];
          query.data.map((row) => {
            const code = {
              id: row[0],
              code: row[1],
              name: row[2],
            };
            codes.push(code);
          });
          res.status(200).json(codes);
        } else if (Object.keys(req.query).length === 0) {
          const query = await getAllSuppliers();
          res.status(200).json(query.data);
        } else {
          res.status(400).json({ error: true, data: "Bad Request" });
        }
        break;

      case "POST":
        const {
          code,
          company,
          name,
          opnBalance,
          phone,
          address,
          type,
          status,
          group,
          image,
          notes,
        } = req.body;

        const result = await createSupplier(
          code,
          company,
          name,
          opnBalance,
          phone,
          address,
          type,
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
}));
