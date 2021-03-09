import { db } from "@/libs/fauna";
import { query as q } from "faunadb";
import { SentryInitialize } from "@/libs/sentry";

SentryInitialize();

const createWarehouse = (
  code,
  name,
  type,
  capacity,
  incharge,
  address,
  phone,
  status,
  group,
  image,
  notes
) => {
  return db.query(
    q.Create(q.Collection("warehouses"), {
      data: {
        code: code ?? "",
        name: name ?? "",
        type: type ?? "",
        capacity: capacity ?? "",
        incharge: incharge ?? "",
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

const getAllWarehouses = () => {
  return db.query(
    q.Map(
      q.Paginate(q.Match(q.Index("all_warehouses"))),
      q.Lambda(
        "warehouseRef",
        q.Let(
          {
            warehouseDoc: q.Get(q.Var("warehouseRef")),
          },
          {
            id: q.Select(["ref", "id"], q.Var("warehouseDoc")),
            code: q.Select(["data", "code"], q.Var("warehouseDoc")),
            name: q.Select(["data", "name"], q.Var("warehouseDoc")),
            type: q.Select(["data", "type"], q.Var("warehouseDoc")),
            capacity: q.Select(["data", "capacity"], q.Var("warehouseDoc")),
            incharge: q.Select(["data", "incharge"], q.Var("warehouseDoc")),
            address: q.Select(["data", "address"], q.Var("warehouseDoc")),
            phone: q.Select(["data", "phone"], q.Var("warehouseDoc")),
            status: q.Select(["data", "status"], q.Var("warehouseDoc")),
            group: q.Select(["data", "group"], q.Var("warehouseDoc")),
            image: q.Select(["data", "image"], q.Var("warehouseDoc")),
            notes: q.Select(["data", "notes"], q.Var("warehouseDoc")),
          }
        )
      )
    )
  );
};

const getAllWarehouseCodes = () => {
  return db.query(q.Paginate(q.Match(q.Index("all_warehouse_codes"))));
};

export default async (req, res) => {
  try {
    const {
      query: { filter },
      method,
    } = req;

    switch (method) {
      case "GET":
        //FIXME:Pagination support for ui table
        if (filter === "codes") {
          const warehouseCodesQuery = await getAllWarehouseCodes();
          const warehouseCodes = [];

          warehouseCodesQuery.data.map((row) => {
            const warehouse = {
              id: row[0],
              code: row[1],
              name: row[2],
            };
            warehouseCodes.push(warehouse);
          });

          res.status(200).json(warehouseCodes);
        } else if (Object.keys(req.query).length === 0) {
          const query = await getAllWarehouses();
          res.status(200).json(query.data);
        } else {
          res.status(400).json({ error: true, data: "Bad Request" });
        }
        break;

      case "POST":
        const {
          code,
          name,
          type,
          capacity,
          incharge,
          address,
          phone,
          status,
          group,
          image,
          notes,
        } = req.body;

        const result = await createWarehouse(
          code,
          name,
          type,
          capacity,
          incharge,
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
