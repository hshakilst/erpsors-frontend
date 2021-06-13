import { db } from "@/fauna/index";
import { query as q } from "faunadb";

export const getStoreRequisitionById = (id) => {
  return db.query(q.Get(q.Ref(q.Collection("store_requisitions"), id)));
};

export const deleteStoreRequisitionById = (id) => {
  return db.query(q.Delete(q.Ref(q.Collection("store_requisitions"), id)));
};

export const updateStoreRequisitionById = ({
  id,
  item,
  reqQty,
  warehouse,
  notes,
  reqDate,
}) => {
  return db.query(
    q.Update(q.Ref(q.Collection("store_requisitions"), id), {
      data: {
        item,
        reqQty,
        warehouse,
        notes,
        reqDate,
      },
    })
  );
};

export const createStoreRequisition = ({
  code,
  item,
  reqQty,
  warehouse,
  notes,
  reqDate,
}) => {
  return db.query(
    q.Create(q.Collection("store_requisitions"), {
      data: {
        code: code ?? "",
        item: item ?? "",
        reqQty: reqQty ?? "",
        reqDate: reqDate ?? "",
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
            reqDate: q.Select(["data", "reqDate"], q.Var("storeReqDoc")),
            warehouse: q.Select(["data", "warehouse"], q.Var("storeReqDoc")),
            notes: q.Select(["data", "notes"], q.Var("storeReqDoc")),
          }
        )
      )
    )
  );
};

export const getAllStoreRequisitionCodes = () => {
  return db.query(q.Paginate(q.Match(q.Index("all_store_requisition_codes"))));
};
