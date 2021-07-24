import { db } from "@/fauna/index";
import { query as q } from "faunadb";

export const getStoreIssuesById = (id) => {
  return db.query(q.Get(q.Ref(q.Collection("store_issues"), id)));
};

export const deleteStoreIssuesById = (id) => {
  return db.query(q.Delete(q.Ref(q.Collection("store_issues"), id)));
};

export const updateStoreIssuesById = (
  id,
  reqCode,
  item,
  issRate,
  issQty,
  warehouse,
  notes,
  isPosted
) => {
  return db.query(
    q.Update(q.Ref(q.Collection("store_issues"), id), {
      data: {
        reqCode,
        item,
        issRate,
        issQty,
        warehouse,
        notes,
        isPosted,
      },
    })
  );
};

export const createStoreIssue = (
  code,
  reqCode,
  item,
  opnRate,
  opnQty,
  issRate,
  issQty,
  warehouse,
  notes,
  isPosted
) => {
  return db.query(
    // q.Do(
    q.Create(q.Collection("store_issues"), {
      data: {
        code: code ?? "",
        reqCode: reqCode ?? "",
        item: item ?? "",
        opnRate: opnRate ?? "",
        opnQty: opnQty ?? "",
        issRate: issRate ?? "",
        issQty: issQty ?? "",
        warehouse: warehouse ?? "",
        notes: notes ?? "",
        isPosted: isPosted ?? false,
      },
    })
    // q.Call("OnIssueUpdateItem", item.id, issQty)
    //)
  );
};

export const getAllStoreIssues = () => {
  return db.query(
    q.Map(
      q.Paginate(q.Match(q.Index("all_store_issues")), { size: 10000 }),
      q.Lambda("docRef", q.Get(q.Var("docRef")))
    )
  );
};

export const getAllStoreIssueCodes = () => {
  return db.query(
    q.Paginate(q.Match(q.Index("all_store_issue_codes")), { size: 10000 })
  );
};
