import useSWR, { mutate } from "swr";
import { fetcher } from "@/adapters";
import axios from "axios";

export const useGetAllPurchaseOrders = () => {
  const { data, error, ...rest } = useSWR("/api/purchase-orders", fetcher, {
    revalidateOnFocus: false,
  });

  return {
    data: data?.map((row) => {
      const id = row.ref["@ref"].id;
      return { id, ...row.data };
    }),
    error,
    loading: !data && !error,
    ...rest,
  };
};

export const useCreatePurchaseOrder = async ({
  code,
  reqCode,
  item,
  rate,
  appQty,
  supplier,
  purMode,
  creDays,
  purBy,
  warehouse,
  notes,
  totalAmount,
  date,
}) => {
  const res = await axios.post("/api/purchase-orders", {
    code,
    reqCode,
    item,
    rate,
    appQty,
    supplier,
    purMode,
    creDays,
    purBy,
    warehouse,
    notes,
    totalAmount,
    date,
  });
  mutate("/api/purchase-orders");
  return { error: res.data.error, data: res.data.data };
};

export const useGetAllPurchaseOrderCodes = () => {
  const { data, error, ...rest } = useSWR(
    "/api/purchase-orders?filter=codes",
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return { data, error, loading: !data && !error, ...rest };
};

export const useDeletePurchaseOrdersById = async (id) => {
  const res = await axios.delete(`/api/purchase-orders/${id}`);
  mutate("/api/purchase-orders");
  return { error: res.data.error, data: res.data.data };
};

export const useGetPurchaseOrdersById = (id) => {
  const { data, error, ...rest } = useSWR(
    id ? `/api/purchase-orders/${id}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
  return { data, error, loading: !data && !error, ...rest };
};

export const useUpdatePurchaseOrdersById = async ({
  id,
  reqCode,
  item,
  rate,
  appQty,
  supplier,
  purMode,
  creDays,
  purBy,
  notes,
  totalAmount,
  date,
}) => {
  const res = await axios.patch(`/api/purchase-orders/${id}`, {
    reqCode,
    item,
    rate,
    appQty,
    supplier,
    purMode,
    creDays,
    purBy,
    notes,
    totalAmount,
    date,
  });
  mutate("/api/purchase-orders");
  return { error: res.data.error, data: res.data.data };
};
