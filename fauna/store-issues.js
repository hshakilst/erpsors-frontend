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
      q.Paginate(q.Match(q.Index("all_store_issues"))),
      q.Lambda(
        "docRef",
        q.Let(
          {
            doc: q.Get(q.Var("docRef")),
          },
          {
            id: q.Select(["ref", "id"], q.Var("doc")),
            code: q.Select(["data", "code"], q.Var("doc")),
            reqCode: q.Select(["data", "reqCode"], q.Var("doc")),
            item: q.Select(["data", "item"], q.Var("doc")),
            opnRate: q.Select(["data", "opnRate"], q.Var("doc")),
            opnQty: q.Select(["data", "opnQty"], q.Var("doc")),
            issRate: q.Select(["data", "issRate"], q.Var("doc")),
            issQty: q.Select(["data", "issQty"], q.Var("doc")),
            warehouse: q.Select(["data", "warehouse"], q.Var("doc")),
            notes: q.Select(["data", "notes"], q.Var("doc")),
            isPosted: q.Select(["data", "isPosted"], q.Var("doc")),
          }
        )
      )
    )
  );
};

export const getAllStoreIssueCodes = () => {
  return db.query(q.Paginate(q.Match(q.Index("all_store_issue_codes"))));
};
