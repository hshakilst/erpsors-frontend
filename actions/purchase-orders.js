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

export const useGetPurchaseOrderCodes = () => {
  const { data, error, ...rest } = useSWR(
    "/api/purchase-orders?filter=codes",
    fetcher
  );

  return { data, error, loading: !data && !error, ...rest };
};
