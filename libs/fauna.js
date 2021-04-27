import faunadb, { query as q } from "faunadb";

export const db = new faunadb.Client({
  secret: "fnAEHo6abFACBd8TkzI8bDEOx5c6NBfclT4XXxBH",
});

export const getOpeningItemRateQtyById = (id) => {
  return db.query(q.Paginate(q.Match(q.Index("item_rate_qty_by_id"), id)));
};
