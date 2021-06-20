import { db } from "@/fauna/index";
import { query as q } from "faunadb";

export const getPurchaseOrderById = (id) => {
  return db.query(q.Get(q.Ref(q.Collection("purchase_orders"), id)));
};

export const deletePurchaseOrdersById = (id) => {
  return db.query(q.Delete(q.Ref(q.Collection("purchase_orders"), id)));
};

export const updatePurchaseOrderById = ({
  id,
  reqCode,
  item,
  rate,
  appQty,
  supplier,
  purMode,
  creDays,
  purBy,
  notes,
  totalAmount,
  date,
}) => {
  return db.query(
    q.Update(q.Ref(q.Collection("purchase_orders"), id), {
      data: {
        reqCode,
        item,
        rate,
        appQty,
        supplier,
        purMode,
        creDays,
        purBy,
        notes,
        totalAmount,
        date,
      },
    })
  );
};

export const createPurchaseOrder = ({
  code,
  reqCode,
  item,
  rate,
  appQty,
  supplier,
  purMode,
  creDays,
  purBy,
  warehouse,
  notes,
  totalAmount,
  date,
}) => {
  return db.query(
    q.Create(q.Collection("purchase_orders"), {
      data: {
        code: code ?? "",
        reqCode: reqCode ?? "",
        item: item ?? "",
        rate: rate ?? "",
        appQty: appQty ?? "",
        supplier: supplier ?? "",
        purMode: purMode ?? "",
        creDays: creDays ?? "",
        purBy: purBy ?? "",
        warehouse: warehouse ?? "",
        notes: notes ?? "",
        totalAmount: totalAmount ?? "",
        date: date ?? "",
      },
    })
  );
};

export const getAllPurchaseOrders = () => {
  return db.query(
    q.Map(
      q.Paginate(q.Match(q.Index("all_purchase_orders")), { size: 10000 }),
      q.Lambda("docRef", q.Get(q.Var("docRef")))
    )
  );
};

export const getAllPurchaseOrderCodes = () => {
  return db.query(
    q.Paginate(q.Match(q.Index("all_purchase_order_codes")), { size: 10000 })
  );
};
