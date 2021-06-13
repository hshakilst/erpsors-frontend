import { db } from "@/fauna/index";
import { query as q } from "faunadb";

export const getItemLedgerById = (id) => {
  return db.query(q.Get(q.Ref(q.Collection("items_ledger"), id)));
};

export const deleteItemLedgerById = (id) => {
  return db.query(q.Delete(q.Ref(q.Collection("items_ledger"), id)));
};

export const updateItemLedgerById = (
  id,
  code, //store-receipt or store-issues codes
  type, //store-receipt or store-issues
  itemCode,
  itemName,
  opnRate,
  opnQty,
  recRate,
  recQty,
  issRate,
  issQty,
  warehouseCode,
  warehouseName
) => {
  return db.query(
    q.Update(q.Ref(q.Collection("store_issues"), id), {
      data: {
        reqCode,
        item,
        valueRate,
        issQty,
        warehouse,
        notes,
        isPosted,
      },
    })
  );
};

export const createItemsLedger = (
  code,
  type,
  itemId,
  itemCode,
  itemName,
  opnRate,
  opnQty,
  recRate,
  recQty,
  issRate,
  issQty,
  cloRate,
  cloQty,
  warehouseCode,
  warehouseName
) => {
  if (type === "store-issues")
    db.query(q.Call("OnIssueUpdateItem", itemId, issQty));
  else if (type === "store-receipts")
    db.query(q.Call("OnReceiveUpdateItem", itemId, recQty, recRate));

  return db.query(
    q.Create(q.Collection("items_ledger"), {
      data: {
        code: code ?? "",
        type: type ?? "",
        itemCode: itemCode ?? "",
        itemName: itemName ?? "",
        opnRate: opnRate ?? "",
        opnQty: opnQty ?? "",
        recRate: recRate ?? "",
        recQty: recQty ?? "",
        issRate: issRate ?? "",
        issQty: issQty ?? "",
        cloRate: cloRate ?? "",
        cloQty: cloQty ?? "",
        warehouseCode: warehouseCode ?? "",
        warehouseName: warehouseName ?? "",
      },
    })
  );
};

export const getAllItemsLedger = () => {
  return db.query(
    q.Map(
      q.Paginate(q.Match(q.Index("all_items_ledger"))),
      q.Lambda(
        "docRef",
        q.Let(
          {
            doc: q.Get(q.Var("docRef")),
          },
          {
            id: q.Select(["ref", "id"], q.Var("doc")),
            date: q.ToString(
              q.ToDate(q.Epoch(q.Select(["ts"], q.Var("doc")), "microseconds"))
            ),
            code: q.Select(["data", "code"], q.Var("doc")),
            type: q.Select(["data", "type"], q.Var("doc")),
            itemCode: q.Select(["data", "itemCode"], q.Var("doc")),
            itemName: q.Select(["data", "itemName"], q.Var("doc")),
            opnRate: q.Select(["data", "opnRate"], q.Var("doc")),
            opnQty: q.Select(["data", "opnQty"], q.Var("doc")),
            recRate: q.Select(["data", "recRate"], q.Var("doc")),
            recQty: q.Select(["data", "recQty"], q.Var("doc")),
            issRate: q.Select(["data", "issRate"], q.Var("doc")),
            issQty: q.Select(["data", "issQty"], q.Var("doc")),
            cloRate: q.Select(["data", "cloRate"], q.Var("doc")),
            cloQty: q.Select(["data", "cloQty"], q.Var("doc")),
            warehouseCode: q.Select(["data", "warehouseCode"], q.Var("doc")),
            warehouseName: q.Select(["data", "warehouseName"], q.Var("doc")),
          }
        )
      )
    )
  );
};
