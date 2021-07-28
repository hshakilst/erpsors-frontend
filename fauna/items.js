import { db } from "@/fauna/index";
import { query as q } from "faunadb";
import { getSession } from "@auth0/nextjs-auth0";

export const getItemById = (id) => {
  return db.query(q.Get(q.Ref(q.Collection("items"), id)));
};

export const deleteItemById = (id) => {
  return db.query(q.Delete(q.Ref(q.Collection("items"), id)));
};

export const updateItemById = ({
  id,
  opnDate,
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
  supplier,
}) => {
  return db.query(
    q.Update(q.Ref(q.Collection("items"), id), {
      data: {
        opnDate,
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
        supplier,
      },
    })
  );
};

export const getOpeningItemRateQtyByCode = (code) => {
  return db.query(q.Paginate(q.Match(q.Index("item_rate_qty_by_code"), code)));
};

export const createItem = ({
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
  supplier,
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
        supplier: supplier ?? "",
      },
    })
  );
};

export const getAllItems = () => {
  return db.query(
    q.Map(
      q.Paginate(q.Match(q.Index("all_items")), { size: 10000 }),
      q.Lambda("docRef", q.Get(q.Var("docRef")))
    )
  );
};

export const getAllItemCodes = () => {
  return db.query(
    q.Paginate(q.Match(q.Index("all_item_codes")), {
      size: 10000,
    })
  );
};
