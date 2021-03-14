import useSWR, { mutate } from "swr";
import { fetcher } from "@/actions";
import axios from "axios";

export const useGetAllPurchaseOrders = () => {
  const { data, error, ...rest } = useSWR("/api/purchase-orders", fetcher);

  return { data, error, loading: !data && !error, ...rest };
};

export const useCreatePurchaseOrder = async (
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
  notes
) => {
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
  });
  mutate("/api/purchase-orders");
  return { error: res.data.error, data: res.data.data };
};

export const useGetAllPurchaseOrderCodes = () => {
  const { data, error, ...rest } = useSWR(
    "/api/purchase-orders?filter=codes",
    fetcher
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
    fetcher
  );
  return { data, error, loading: !data && !error, ...rest };
};

export const useUpdatePurchaseOrdersById = async (
  id,
  reqCode,
  item,
  rate,
  appQty,
  supplier,
  purMode,
  creDays,
  purBy,
  notes
) => {
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
  });
  mutate("/api/purchase-orders");
  return { error: res.data.error, data: res.data.data };
};
