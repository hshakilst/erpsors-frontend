import { db } from "@/fauna/index";
import { query as q } from "faunadb";

export const getWarehouseById = (id) => {
  return db.query(q.Get(q.Ref(q.Collection("warehouses"), id)));
};

export const deleteWarehouseById = (id) => {
  return db.query(q.Delete(q.Ref(q.Collection("warehouses"), id)));
};

export const updateWarehouseById = (
  id,
  name,
  type,
  // capacity,
  incharge,
  address,
  phone,
  status,
  group,
  image,
  notes
) => {
  return db.query(
    q.Update(q.Ref(q.Collection("warehouses"), id), {
      data: {
        name,
        type,
        incharge,
        address,
        phone,
        status,
        group,
        image,
        notes,
      },
    })
  );
};

export const createWarehouse = (
  code,
  name,
  type,
  // capacity,
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
        // capacity: capacity ?? "",
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

export const getAllWarehouses = () => {
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
            // capacity: q.Select(["data", "capacity"], q.Var("warehouseDoc")),
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

export const getAllWarehouseCodes = () => {
  return db.query(q.Paginate(q.Match(q.Index("all_warehouse_codes"))));
};
