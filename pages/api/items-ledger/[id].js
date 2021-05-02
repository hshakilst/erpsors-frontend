import { db } from "@/libs/fauna";
import { SentryInitialize } from "@/libs/sentry";
import { query as q } from "faunadb";
import LogRocket from "logrocket";

LogRocket.init("ogzvmk/demo");
SentryInitialize();

const getItemLedgerById = (id) => {
  return db.query(q.Get(q.Ref(q.Collection("items_ledger"), id)));
};

const deleteItemLedgerById = (id) => {
  return db.query(q.Delete(q.Ref(q.Collection("items_ledger"), id)));
};

// const updateItemLedgerById = (
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

export default async (req, res) => {
  try {
    const {
      query: { id },
      method,
    } = req;

    const { reqCode, item, valueRate, issQty, warehouse, notes, isPosted } = req.body;

    switch (method) {
      case "GET":
        const query = await getItemLedgerById(id);
        res.status(200).json(query.data);
        break;
      // case "PATCH":
      //   const resUpdate = await updateStoreIssuesById(
      //     id,
      //     reqCode,
      //     item,
      //     valueRate,
      //     issQty,
      //     warehouse,
      //     notes,
      //     isPosted
      //   );
      //   res.status(200).json({ error: false, data: resUpdate });
      //   break;
      case "DELETE":
        const resDelete = await deleteItemLedgerById(id);
        res.status(200).json({ error: false, data: resDelete });
        break;
      default:
        res.setHeader("Allow", ["GET", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: true, data: error });
  }
};
