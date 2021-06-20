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
      q.Paginate(q.Match(q.Index("all_store_receipts")), { size: 10000 }),
      q.Lambda("docRef", q.Get(q.Var("docRef")))
    )
  );
};

export const getAllStoreReceiptCodes = () => {
  return db.query(q.Paginate(q.Match(q.Index("all_store_receipt_codes"))));
};
