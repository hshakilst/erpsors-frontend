import { db } from "@/libs/fauna";
import { query as q } from "faunadb";
import { SentryInitialize } from "@/libs/sentry";

SentryInitialize();

const createMaterialIssue = (
  code,
  reqCode,
  item,
  valueRate,
  issQty,
  warehouse,
  notes
) => {
  return db.query(
    q.Create(q.Collection("material_issues"), {
      data: {
        code: code ?? "",
        reqCode: reqCode ?? "",
        item: item ?? "",
        valueRate: valueRate ?? "",
        issQty: issQty ?? "",
        warehouse: warehouse ?? "",
        notes: notes ?? "",
      },
    })
  );
};

const getAllMaterialIssues = () => {
  return db.query(
    q.Map(
      q.Paginate(q.Match(q.Index("all_material_issues"))),
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
            valueRate: q.Select(["data", "valueRate"], q.Var("doc")),
            issQty: q.Select(["data", "issQty"], q.Var("doc")),
            warehouse: q.Select(["data", "warehouse"], q.Var("doc")),
            notes: q.Select(["data", "notes"], q.Var("doc")),
          }
        )
      )
    )
  );
};

export default async (req, res) => {
  try {
    const {
      query: { id, name },
      method,
    } = req;

    switch (method) {
      case "GET":
        //FIXME:Pagination support for ui table
        const query = await getAllMaterialIssues();
        res.status(200).json(query.data);
        break;
      case "POST":
        const {
          code,
          reqCode,
          item,
          valueRate,
          issQty,
          warehouse,
          notes,
        } = req.body;

        const result = await createMaterialIssue(
          code,
          reqCode,
          item,
          valueRate,
          issQty,
          warehouse,
          notes
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
