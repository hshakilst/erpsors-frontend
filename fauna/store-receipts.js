import { db } from "@/fauna/index";
import { query as q } from "faunadb";

export const getStoreReceiptById = (id) => {
  return db.query(q.Get(q.Ref(q.Collection("store_receipts"), id)));
};

export const deleteStoreReceiptById = (id) => {
  return db.query(q.Delete(q.Ref(q.Collection("store_receipts"), id)));
};

export const updateStoreReceiptById = (
  id,
  poCode,
  item,
  valueRate,
  recQty,
  warehouse,
  notes,
  isPosted
) => {
  return db.query(
    q.Update(q.Ref(q.Collection("store_receipts"), id), {
      data: {
        poCode,
        item,
        valueRate,
        recQty,
        warehouse,
        notes,
        isPosted,
      },
    })
  );
};

export const createStoreReceipt = (
  code,
  poCode,
  item,
  opnRate,
  opnQty,
  valueRate,
  recQty,
  warehouse,
  notes,
  isPosted
) => {
  return db.query(
    q.Create(q.Collection("store_receipts"), {
      data: {
        code: code ?? "",
        poCode: poCode ?? "",
        item: item ?? "",
        opnRate: opnRate ?? "",
        opnQty: opnQty ?? "",
        valueRate: valueRate ?? "",
        recQty: recQty ?? "",
        warehouse: warehouse ?? "",
        notes: notes ?? "",
        isPosted: isPosted ?? false,
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
            opnRate: q.Select(["data", "opnRate"], q.Var("doc")),
            opnQty: q.Select(["data", "opnQty"], q.Var("doc")),
            valueRate: q.Select(["data", "valueRate"], q.Var("doc")),
            recQty: q.Select(["data", "recQty"], q.Var("doc")),
            warehouse: q.Select(["data", "warehouse"], q.Var("doc")),
            notes: q.Select(["data", "notes"], q.Var("doc")),
            isPosted: q.Select(["data", "isPosted"], q.Var("doc")),
          }
        )
      )
    )
  );
};

export const getAllStoreReceiptCodes = () => {
  return db.query(q.Paginate(q.Match(q.Index("all_store_receipt_codes"))));
};
