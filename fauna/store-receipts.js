import { db } from "@/fauna/index";
import { query as q } from "faunadb";

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

export const getStoreReceiptById = (id) => {
  return db.query(q.Get(q.Ref(q.Collection("store_receipts"), id)));
};

export const deleteStoreReceiptById = (id) => {
  return db.query(q.Delete(q.Ref(q.Collection("store_receipts"), id)));
};

export const updateStoreReceiptById = ({
  id,
  date,
  poCode,
  item,
  recRate,
  recQty,
  warehouse,
  notes,
  isPosted,
}) => {
  return db.query(
    q.Update(q.Ref(q.Collection("store_receipts"), id), {
      data: {
        date,
        poCode,
        item,
        recRate,
        recQty,
        warehouse,
        notes,
        isPosted,
      },
    })
  );
};

export const createStoreReceipt = ({
  date,
  code,
  poCode,
  item,
  opnRate,
  opnQty,
  recRate,
  recQty,
  warehouse,
  notes,
}) => {
  return db.query(
    q.Create(q.Collection("store_receipts"), {
      data: {
        date: date ?? "",
        code: code ?? "",
        poCode: poCode ?? "",
        item: item ?? "",
        opnRate: opnRate ?? "",
        opnQty: opnQty ?? "",
        recRate: recRate ?? "",
        recQty: recQty ?? "",
        warehouse: warehouse ?? "",
        notes: notes ?? "",
        isPosted: false,
      },
    })
  );
};
