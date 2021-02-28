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

export const createStoreRequisition = (
  code,
  item,
  reqQty,
  warehouse,
  notes
) => {
  return db.query(
    q.Create(q.Collection("store_requisitions"), {
      data: {
        code: code ?? "",
        item: item ?? "",
        reqQty: reqQty ?? "",
        warehouse: warehouse ?? "",
        notes: notes ?? "",
      },
    })
  );
};

export const getAllStoreRequisitions = () => {
  return db.query(
    q.Map(
      q.Paginate(q.Match(q.Index("all_store_requisitions"))),
      q.Lambda(
        "storeReqRef",
        q.Let(
          {
            storeReqDoc: q.Get(q.Var("storeReqRef")),
          },
          {
            id: q.Select(["ref", "id"], q.Var("storeReqDoc")),
            code: q.Select(["data", "code"], q.Var("storeReqDoc")),
            item: q.Select(["data", "item"], q.Var("storeReqDoc")),
            reqQty: q.Select(["data", "reqQty"], q.Var("storeReqDoc")),
            warehouse: q.Select(["data", "warehouse"], q.Var("storeReqDoc")),
            notes: q.Select(["data", "notes"], q.Var("storeReqDoc")),
          }
        )
      )
    )
  );
};

export const createPurchaseOrder = (
  code,
  reqCode,
  item,
  appQty,
  supplier,
  purMode,
  creDays,
  purBy,
  warehouse,
  notes
) => {
  return db.query(
    q.Create(q.Collection("purchase_orders"), {
      data: {
        code: code ?? "",
        reqCode: reqCode ?? "",
        item: item ?? "",
        appQty: appQty ?? "",
        supplier: supplier ?? "",
        purMode: purMode ?? "",
        creDays: creDays ?? "",
        purBy: purBy ?? "",
        warehouse: warehouse ?? "",
        notes: notes ?? "",
      },
    })
  );
};

export const getAllPurchaseOrders = () => {
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
            appQty: q.Select(["data", "appQty"], q.Var("purOrderDoc")),
            supplier: q.Select(["data", "supplier"], q.Var("purOrderDoc")),
            purMode: q.Select(["data", "purMode"], q.Var("purOrderDoc")),
            creDays: q.Select(["data", "creDays"], q.Var("purOrderDoc")),
            purBy: q.Select(["data", "purBy"], q.Var("purOrderDoc")),
            warehouse: q.Select(["data", "warehouse"], q.Var("purOrderDoc")),
            notes: q.Select(["data", "notes"], q.Var("purOrderDoc")),
          }
        )
      )
    )
  );
};

export const createMaterialIssue = (
  code,
  reqCode,
  item,
  valueRate,
  issQty,
  warehouse,
  notes
) => {
  return db.query(
    q.Create(q.Collection("material_issues"), {
      data: {
        code: code ?? "",
        reqCode: reqCode ?? "",
        item: item ?? "",
        valueRate: valueRate ?? "",
        issQty: issQty ?? "",
        warehouse: warehouse ?? "",
        notes: notes ?? "",
      },
    })
  );
};

export const getAllMaterialIssues = () => {
  return db.query(
    q.Map(
      q.Paginate(q.Match(q.Index("all_material_issues"))),
      q.Lambda(
        "docRef",
        q.Let(
          {
            doc: q.Get(q.Var("docRef")),
          },
          {
            id: q.Select(["ref", "id"], q.Var("doc")),
            code: q.Select(["data", "code"], q.Var("doc")),
            reqCode: q.Select(["data", "reqCode"], q.Var("doc")),
            item: q.Select(["data", "item"], q.Var("doc")),
            valueRate: q.Select(["data", "valueRate"], q.Var("doc")),
            issQty: q.Select(["data", "issQty"], q.Var("doc")),
            warehouse: q.Select(["data", "warehouse"], q.Var("doc")),
            notes: q.Select(["data", "notes"], q.Var("doc")),
          }
        )
      )
    )
  );
};

export const createStoreReceipt = (
  code,
  poCode,
  item,
  valueRate,
  recQty,
  warehouse,
  notes
) => {
  return db.query(
    q.Create(q.Collection("store_receipts"), {
      data: {
        code: code ?? "",
        poCode: poCode ?? "",
        item: item ?? "",
        valueRate: valueRate ?? "",
        recQty: recQty ?? "",
        warehouse: warehouse ?? "",
        notes: notes ?? "",
      },
    })
  );
};

export const getAllStoreReceipts = () => {
  return db.query(
    q.Map(
      q.Paginate(q.Match(q.Index("all_store_receipts"))),
      q.Lambda(
        "docRef",
        q.Let(
          {
            doc: q.Get(q.Var("docRef")),
          },
          {
            id: q.Select(["ref", "id"], q.Var("doc")),
            code: q.Select(["data", "code"], q.Var("doc")),
            poCode: q.Select(["data", "poCode"], q.Var("doc")),
            item: q.Select(["data", "item"], q.Var("doc")),
            valueRate: q.Select(["data", "valueRate"], q.Var("doc")),
            recQty: q.Select(["data", "recQty"], q.Var("doc")),
            warehouse: q.Select(["data", "warehouse"], q.Var("doc")),
            notes: q.Select(["data", "notes"], q.Var("doc")),
          }
        )
      )
    )
  );
};
