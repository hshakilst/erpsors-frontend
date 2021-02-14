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
  item,
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
        item,
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
            itemDoc: q.Get(q.Var("supplierRef")),
          },
          {
            id: q.Select(["ref", "id"], q.Var("supplierRef")),
            code: q.Select(["data", "code"], q.Var("supplierRef")),
            company: q.Select(["data", "company"], q.Var("supplierRef")),
            name: q.Select(["data", "name"], q.Var("supplierRef")),
            type: q.Select(["data", "type"], q.Var("supplierRef")),
            opnBalance: q.Select(["data", "opnBalance"], q.Var("supplierRef")),
            item: q.Select(["data", "item"], q.Var("supplierRef")),
            address: q.Select(["data", "address"], q.Var("supplierRef")),
            phone: q.Select(["data", "phone"], q.Var("supplierRef")),
            status: q.Select(["data", "status"], q.Var("supplierRef")),
            group: q.Select(["data", "group"], q.Var("supplierRef")),
            image: q.Select(["data", "image"], q.Var("supplierRef")),
            notes: q.Select(["data", "notes"], q.Var("supplierRef")),
          }
        )
      )
    )
  );
};