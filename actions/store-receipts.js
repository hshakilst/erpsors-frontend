import useSWR, { mutate } from "swr";
import { fetcher } from "@/actions";
import axios from "axios";

export const useGetAllStoreReceipts = () => {
  const { data, error, ...rest } = useSWR("/api/store-receipts", fetcher);

  return { data, error, loading: !data && !error, ...rest };
};

export const useCreateStoreReceipt = async (
  code,
  poCode,
  item,
  valueRate,
  recQty,
  warehouse,
  notes
) => {
  const res = await axios.post("/api/store-receipts", {
    code,
    poCode,
    item,
    valueRate,
    recQty,
    warehouse,
    notes,
  });
  mutate("/api/store-receipts");
  return { error: res.data.error, data: res.data.data };
};

export const useGetStoreReceiptCodes = () => {
  const { data, error, ...rest } = useSWR(
    "/api/store-receipts?filter=codes",
    fetcher
  );

  return { data, error, loading: !data && !error, ...rest };
};
