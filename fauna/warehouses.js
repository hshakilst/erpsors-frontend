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
      q.Paginate(q.Match(q.Index("all_warehouses")), { size: 10000 }),
      q.Lambda("docRef", q.Get(q.Var("docRef")))
    )
  );
};

export const getAllWarehouseCodes = () => {
  return db.query(
    q.Paginate(q.Match(q.Index("all_warehouse_codes")), { size: 10000 })
  );
};
