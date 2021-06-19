import { db } from "@/fauna/index";
import { query as q } from "faunadb";
import { getSession } from "@auth0/nextjs-auth0";

export const getItemById = (id) => {
  return db.query(q.Get(q.Ref(q.Collection("items"), id)));
};

export const deleteItemById = (id) => {
  return db.query(q.Delete(q.Ref(q.Collection("items"), id)));
};

export const updateItemById = ({
  id,
  opnDate,
  name,
  type,
  qty,
  totalAmount,
  valueRate,
  unit,
  status,
  shelfLife,
  group,
  image,
  notes,
  warehouse,
  supplier,
}) => {
  return db.query(
    q.Update(q.Ref(q.Collection("items"), id), {
      data: {
        opnDate,
        name,
        type,
        qty,
        totalAmount,
        valueRate,
        unit,
        status,
        shelfLife,
        group,
        image,
        notes,
        warehouse,
        supplier,
      },
    })
  );
};

export const getOpeningItemRateQtyById = (id) => {
  return db.query(q.Paginate(q.Match(q.Index("item_rate_qty_by_id"), id)));
};

export const createItem = ({
  opnDate,
  code,
  name,
  type,
  qty,
  totalAmount,
  valueRate,
  unit,
  status,
  shelfLife,
  group,
  image,
  notes,
  warehouse,
  supplier,
}) => {
  return db.query(
    q.Create(q.Collection("items"), {
      data: {
        opnDate: opnDate ?? "",
        code: code ?? "",
        name: name ?? "",
        type: type ?? "",
        qty: qty ?? "",
        totalAmount: totalAmount ?? "",
        valueRate: valueRate ?? "",
        unit: unit ?? "",
        status: status ?? "",
        shelfLife: shelfLife ?? "",
        group: group ?? "",
        image: image ?? "",
        notes: notes ?? "",
        warehouse: warehouse ?? "",
        supplier: supplier ?? "",
      },
    })
  );
};

export const getAllItems = () => {
  return db.query(
    q.Map(
      q.Paginate(q.Match(q.Index("all_items")), { size: 10000 }),
      q.Lambda(
        "itemRef",
        q.Let(
          {
            itemDoc: q.Get(q.Var("itemRef")),
          },
          {
            id: q.Select(["ref", "id"], q.Var("itemDoc")),
            opnDate: q.Select(["data", "opnDate"], q.Var("itemDoc")),
            code: q.Select(["data", "code"], q.Var("itemDoc")),
            name: q.Select(["data", "name"], q.Var("itemDoc")),
            type: q.Select(["data", "type"], q.Var("itemDoc")),
            qty: q.Select(["data", "qty"], q.Var("itemDoc")),
            totalAmount: q.Select(["data", "totalAmount"], q.Var("itemDoc")),
            valueRate: q.Select(["data", "valueRate"], q.Var("itemDoc")),
            unit: q.Select(["data", "unit"], q.Var("itemDoc")),
            status: q.Select(["data", "status"], q.Var("itemDoc")),
            shelfLife: q.Select(["data", "shelfLife"], q.Var("itemDoc")),
            group: q.Select(["data", "group"], q.Var("itemDoc")),
            image: q.Select(["data", "image"], q.Var("itemDoc")),
            notes: q.Select(["data", "notes"], q.Var("itemDoc")),
            warehouse: q.Select(["data", "warehouse"], q.Var("itemDoc")),
            supplier: q.Select(["data", "supplier"], q.Var("itemDoc")),
          }
        )
      )
    )
  );
};

export const getAllItemCodes = () => {
  return db.query(
    q.Paginate(q.Match(q.Index("all_item_codes")), {
      size: 10000,
    })
  );
};
