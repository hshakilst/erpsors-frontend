import { db } from "@/fauna/index";
import { query as q } from "faunadb";

export const getSupplierById = (id) => {
  return db.query(q.Get(q.Ref(q.Collection("suppliers"), id)));
};

export const deleteSupplierById = (id) => {
  return db.query(q.Delete(q.Ref(q.Collection("suppliers"), id)));
};

export const updateSupplierById = (
  id,
  company,
  name,
  type,
  opnBalance,
  // item,
  address,
  phone,
  status,
  group,
  image,
  notes
) => {
  return db.query(
    q.Update(q.Ref(q.Collection("suppliers"), id), {
      data: {
        company,
        name,
        type,
        opnBalance,
        address,
        phone,
        status,
        group,
        image,
        notes,
      },
    })
  );
};

export const createSupplier = (
  code,
  company,
  name,
  opnBalance,
  phone,
  address,
  type,
  status,
  group,
  image,
  notes
) => {
  return db.query(
    q.Create(q.Collection("suppliers"), {
      data: {
        code: code ?? "",
        company: company ?? "",
        name: name ?? "",
        opnBalance: opnBalance ?? "",
        phone: phone ?? "",
        address: address ?? "",
        type: type ?? "",
        status: status ?? "",
        group: group ?? "",
        image: image ?? "",
        notes: notes ?? "",
      },
    })
  );
};

export const getAllSuppliers = () => {
  return db.query(
    q.Map(
      q.Paginate(q.Match(q.Index("all_suppliers"))),
      q.Lambda(
        "supplierRef",
        q.Let(
          {
            supplierDoc: q.Get(q.Var("supplierRef")),
          },
          {
            id: q.Select(["ref", "id"], q.Var("supplierDoc")),
            code: q.Select(["data", "code"], q.Var("supplierDoc")),
            company: q.Select(["data", "company"], q.Var("supplierDoc")),
            name: q.Select(["data", "name"], q.Var("supplierDoc")),
            opnBalance: q.Select(["data", "opnBalance"], q.Var("supplierDoc")),
            phone: q.Select(["data", "phone"], q.Var("supplierDoc")),
            address: q.Select(["data", "address"], q.Var("supplierDoc")),
            type: q.Select(["data", "type"], q.Var("supplierDoc")),
            status: q.Select(["data", "status"], q.Var("supplierDoc")),
            group: q.Select(["data", "group"], q.Var("supplierDoc")),
            image: q.Select(["data", "image"], q.Var("supplierDoc")),
            notes: q.Select(["data", "notes"], q.Var("supplierDoc")),
          }
        )
      )
    )
  );
};

export const getAllSupplierCodes = () => {
  return db.query(q.Paginate(q.Match(q.Index("all_supplier_codes"))));
};
