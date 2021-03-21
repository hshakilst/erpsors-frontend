import faunadb, { query as q } from "faunadb";

export const db = new faunadb.Client({
  secret: "fnAEAjZiWCACAX9o64oijiaV1JRMsx2P5_2-3Kdq",
});

export const getOpeningItemRateQtyById = (id) => {
  return db.query(q.Paginate(q.Match(q.Index("item_rate_qty_by_id"), id)));
};
