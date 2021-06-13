import faunadb from "faunadb";

export const db = new faunadb.Client({
  secret: process.env.FAUNA_PRODUCTION_SECRET,
});
