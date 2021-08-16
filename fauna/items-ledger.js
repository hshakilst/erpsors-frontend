import { db } from "@/fauna/index";
import { query as q } from "faunadb";

export const getItemLedgerById = (id) => {
  return db.query(q.Get(q.Ref(q.Collection("items_ledger"), id)));
};

export const deleteItemLedgerById = (id) => {
  return db.query(q.Delete(q.Ref(q.Collection("items_ledger"), id)));
};

// export const updateItemLedgerById = (
//   id,
//   code, //store-receipt or store-issues codes
//   type, //store-receipt or store-issues
//   itemCode,
//   itemName,
//   opnRate,
//   opnQty,
//   recRate,
//   recQty,
//   issRate,
//   issQty,
//   warehouseCode,
//   warehouseName
// ) => {
//   return db.query(
//     q.Update(q.Ref(q.Collection("store_issues"), id), {
//       data: {
//         reqCode,
//         item,
//         valueRate,
//         issQty,
//         warehouse,
//         notes,
//         isPosted,
//       },
//     })
//   );
// };

export const createItemsLedger = ({
  code,
  type,
  itemCode,
  opnRate,
  opnQty,
  recRate,
  recQty,
  issRate,
  issQty,
  cloRate,
  cloQty,
  warehouseCode,
  notes,
}) => {
  if (type === "store-issues")
    db.query(q.Call("OnIssueUpdateItem", itemCode, issQty));
  else if (type === "store-receipts")
    db.query(q.Call("OnReceiveUpdateItem", itemCode, recQty, recRate));

  return db.query(
    q.Create(q.Collection("items_ledger"), {
      data: {
        code: code ?? "",
        type: type ?? "",
        itemCode: itemCode ?? "",
        opnRate: opnRate ?? "",
        opnQty: opnQty ?? "",
        recRate: recRate ?? "",
        recQty: recQty ?? "",
        issRate: issRate ?? "",
        issQty: issQty ?? "",
        cloRate: cloRate ?? "",
        cloQty: cloQty ?? "",
        warehouseCode: warehouseCode ?? "",
        notes: notes ?? "",
      },
    })
  );
};

export const getAllItemsLedger = () => {
  return db.query(
    q.Map(
      q.Paginate(q.Match(q.Index("all_items_ledger")), { size: 10000 }),
      q.Lambda("docRef", q.Get(q.Var("docRef")))
    )
  );
};
