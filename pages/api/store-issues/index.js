import { db, getOpeningItemRateQtyById } from "@/libs/fauna";
import { query as q } from "faunadb";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

const createStoreIssue = (
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
    q.Do(
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
      }),
      q.Call("OnIssueUpdateItem", item.id, issQty)
    )
  );
};

const getAllStoreIssues = () => {
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

const getAllStoreIssueCodes = () => {
  return db.query(q.Paginate(q.Match(q.Index("all_material_issue_codes"))));
};

export default withApiAuthRequired(async (req, res) => {
  try {
    const {
      query: { filter },
      method,
    } = req;

    switch (method) {
      case "GET":
        //FIXME:Pagination support for ui table
        if (filter === "codes") {
          const query = await getAllStoreIssueCodes();
          const codes = [];
          query.data.map((row) => {
            const code = {
              id: row[0],
              code: row[1],
            };
            codes.push(code);
          });
          res.status(200).json(codes);
        } else if (Object.keys(req.query).length === 0) {
          const query = await getAllStoreIssues();
          res.status(200).json(query.data);
        } else {
          res.status(400).json({ error: true, data: "Bad Request" });
        }
        break;
      case "POST":
        const {
          code,
          reqCode,
          item,
          issRate,
          issQty,
          warehouse,
          notes,
          isPosted,
        } = req.body;

        const query = await getOpeningItemRateQtyById(item.id);
        const opnRate = query.data[0][0];
        const opnQty = query.data[0][1];
        if (Number(opnQty) < Number(issQty)) {
          res.status(403).json({ error: false, data: "Insufficient quantity" });
        }
        const result = await createStoreIssue(
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
});
