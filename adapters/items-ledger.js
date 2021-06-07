import useSWR, { mutate } from "swr";
import { fetcher } from "@/adapters";
import axios from "axios";

export const useGetAllItemsLedger = () => {
  const { data, error, ...rest } = useSWR("/api/items-ledger", fetcher, {
    revalidateOnFocus: false,
  });

  return { data, error, loading: !data && !error, ...rest };
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

export const useCreateItemLedger = async (
    {code, //store-receipts or store-issues codes
    type, //store-receipts or store-issues
    itemId,
    itemCode,
    itemName,
    opnRate,
    opnQty,
    recRate,
    recQty,
    issRate,
    issQty,
    warehouseCode,
    warehouseName,}
) => {
  const res = await axios.post("/api/items-ledger", {
    code, //store-receipts or store-issues codes
    type, //store-receipts or store-issues
    itemId,
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
  });
  mutate("/api/items-ledger");
  return { error: res.data.error, data: res.data.data };
};

export const useDeleteItemLedgerById = async (id) => {
  const res = await axios.delete(`/api/items-ledger/${id}`);
  mutate("/api/items");
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
