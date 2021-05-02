import { db, getOpeningItemRateQtyById } from "@/libs/fauna";
import { query as q } from "faunadb";
import { SentryInitialize } from "@/libs/sentry";
import LogRocket from "logrocket";

LogRocket.init("ogzvmk/demo");
SentryInitialize();

const createItemsLedger = (
  code,
  type,
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

const getAllItemsLedger = () => {
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
            date: q.ToString(q.ToDate(
              q.Epoch(q.Select(["ts"], q.Var("doc")), "microseconds")
            )),
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

// const getAllStoreIssueCodes = () => {
//   return db.query(q.Paginate(q.Match(q.Index("all_material_issue_codes"))));
// };

export default async (req, res) => {
  try {
    const {
      query: { filter },
      method,
    } = req;

    switch (method) {
      case "GET":
        //FIXME:Pagination support for ui table
        const query = await getAllItemsLedger();
        res.status(200).json(query.data);
        break;
      case "POST":
        const {
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
          warehouseName,
        } = req.body;

        const cloQty = Number(opnQty) + Number(recQty) - Number(issQty);
        const cloValue =
          (Number(opnQty) * Number(opnRate)) +
          (Number(recQty) * Number(recRate)) -
          (Number(issQty) * Number(issRate));
        const cloRate = (cloValue / cloQty);

        const result = await createItemsLedger(
          code,
          type,
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
        );
        res.status(200).json({ error: false, data: result });
        break;
      default:
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: true, data: error });
  }
};
