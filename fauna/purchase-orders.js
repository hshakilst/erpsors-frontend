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
            rate: q.Select(["data", "rate"], q.Var("purOrderDoc")),
            appQty: q.Select(["data", "appQty"], q.Var("purOrderDoc")),
            supplier: q.Select(["data", "supplier"], q.Var("purOrderDoc")),
            purMode: q.Select(["data", "purMode"], q.Var("purOrderDoc")),
            creDays: q.Select(["data", "creDays"], q.Var("purOrderDoc")),
            purBy: q.Select(["data", "purBy"], q.Var("purOrderDoc")),
            warehouse: q.Select(["data", "warehouse"], q.Var("purOrderDoc")),
            notes: q.Select(["data", "notes"], q.Var("purOrderDoc")),
            totalAmount: q.Select(
              ["data", "totalAmount"],
              q.Var("purOrderDoc")
            ),
            date: q.Select(["data", "date"], q.Var("purOrderDoc")),
          }
        )
      )
    )
  );
};

export const getAllPurchaseOrderCodes = () => {
  return db.query(q.Paginate(q.Match(q.Index("all_purchase_order_codes"))));
};
