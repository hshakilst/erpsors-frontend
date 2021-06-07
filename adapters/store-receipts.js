import useSWR, { mutate } from "swr";
import { fetcher } from "@/adapters";
import axios from "axios";

export const useGetAllStoreReceipts = () => {
  const { data, error, ...rest } = useSWR("/api/store-receipts", fetcher, {
    revalidateOnFocus: false,
  });

  return { data, error, loading: !data && !error, ...rest };
};

export const useCreateStoreReceipt = async (
  code,
  poCode,
  item,
  valueRate,
  recQty,
  warehouse,
  notes,
  isPosted
) => {
  const res = await axios.post("/api/store-receipts", {
    code,
    poCode,
    item,
    valueRate,
    recQty,
    warehouse,
    notes,
    isPosted
  });
  mutate("/api/store-receipts");
  return { error: res.data.error, data: res.data.data };
};

export const useGetAllStoreReceiptCodes = () => {
  const { data, error, ...rest } = useSWR(
    "/api/store-receipts?filter=codes",
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return { data, error, loading: !data && !error, ...rest };
};

export const useDeleteStoreReceiptById = async (id) => {
  const res = await axios.delete(`/api/store-receipts/${id}`);
  mutate("/api/store-receipts");
  return { error: res.data.error, data: res.data.data };
};

export const useGetStoreReceiptById = (id) => {
  const { data, error, ...rest } = useSWR(
    id ? `/api/store-receipts/${id}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
  return { data, error, loading: !data && !error, ...rest };
};

export const useUpdateStoreReceiptById = async (
  {id,
  poCode,
  item,
  valueRate,
  recQty,
  warehouse,
  notes,
  isPosted}
) => {
  const res = await axios.patch(`/api/store-receipts/${id}`, {
    poCode,
    item,
    valueRate,
    recQty,
    warehouse,
    notes,
    isPosted
  });
  mutate("/api/store-receipts");
  return { error: res.data.error, data: res.data.data };
};
