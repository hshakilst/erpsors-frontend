import faunadb, { query as q } from "faunadb";

export const db = new faunadb.Client({
  secret: process.env.FAUNA_PRODUCTION_SECRET,
});

export const getOpeningItemRateQtyById = (id) => {
  return db.query(q.Paginate(q.Match(q.Index("item_rate_qty_by_id"), id)));
};
