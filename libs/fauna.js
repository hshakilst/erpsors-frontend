import faunadb, { query as q } from "faunadb";

export const db = new faunadb.Client({
  secret: "fnAEAjZiWCACAX9o64oijiaV1JRMsx2P5_2-3Kdq",
});

export const createItem = (
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
      },
    })
  );
};

export const getAllItems = () => {
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

export const createSupplier = (
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
        notes,
      },
    })
  );
};

export const getAllSuppliers = () => {
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

export const createWarehouse = (
  code,
  name,
  type,
  capacity,
  // items,
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
        code,
        name,
        type,
        capacity,
        // items,
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
            capacity: q.Select(["data", "capacity"], q.Var("warehouseDoc")),
            // items: q.Select(
            //   ["data", "items"],
            //   q.Var("warehouseDoc")
            // ),
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
