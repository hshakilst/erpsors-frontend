import useSWR, { mutate } from "swr";
import { fetcher } from "@/adapters";
import axios from "axios";
import { fromUnixTime, format } from "date-fns";

export const useGetAllItemsLedger = () => {
  const { data, error, ...rest } = useSWR("/api/items-ledger", fetcher, {
    revalidateOnFocus: false,
  });

  return {
    data: data?.map((row) => {
      const id = row.ref["@ref"].id;
      const date = format(fromUnixTime(Number(row.ts) / 1000000), "yyyy-MM-dd");
      return { id, date, ...row.data };
    }),
    error,
    loading: !data && !error,
    ...rest,
  };
};

export const useGetItemLedgerById = (id) => {
  const { data, error, ...rest } = useSWR(
    id ? `/api/items-ledger/${id}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
  return { data, error, loading: !data && !error, ...rest };
};

export const useCreateItemLedger = async ({
  code, //store-receipts or store-issues codes
  type, //store-receipts or store-issues
  itemCode,
  opnRate,
  opnQty,
  recRate,
  recQty,
  issRate,
  issQty,
  warehouseCode,
  notes,
}) => {
  const res = await axios.post("/api/items-ledger", {
    code, //store-receipts or store-issues codes
    type, //store-receipts or store-issues
    itemCode,
    opnRate,
    opnQty,
    recRate,
    recQty,
    issRate,
    issQty,
    warehouseCode,
    notes,
  });
  mutate("/api/items-ledger");
  return { error: res.data.error, data: res.data.data };
};

export const useDeleteItemLedgerById = async (id) => {
  const res = await axios.delete(`/api/items-ledger/${id}`);
  mutate("/api/items-ledger");
  return { error: res.data.error, data: res.data.data };
};

// export const useUpdateItemLedgerById = async (
//   id,
//   name,
//   type,
//   qty,
//   valueRate,
//   unit,
//   status,
//   group,
//   image,
//   notes
// ) => {
//   const res = await axios.patch(`/api/items-ledger/${id}`, {
//     name,
//     type,
//     qty,
//     valueRate,
//     unit,
//     status,
//     group,
//     image,
//     notes,
//   });
//   mutate("/api/items-ledger");
//   return { error: res.data.error, data: res.data.data };
// };

// export const useGetAllItemCodes = () => {
//   const { data, error, ...rest } = useSWR(
//     "/api/items-ledger?filter=codes",
//     fetcher
//   );

//   return { data, error, loading: !data && !error, ...rest };
// };
