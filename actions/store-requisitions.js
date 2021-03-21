import useSWR, { mutate } from "swr";
import { fetcher } from "@/actions";
import axios from "axios";

export const useGetAllStoreRequisitions = () => {
  const { data, error, ...rest } = useSWR("/api/store-requisitions", fetcher);

  return { data, error, loading: !data && !error, ...rest };
};

export const useCreateStoreRequisition = async (
  code,
  item,
  reqQty,
  warehouse,
  notes
) => {
  const res = await axios.post("/api/store-requisitions", {
    code,
    item,
    reqQty,
    warehouse,
    notes,
  });
  mutate("/api/store-requisitions");
  return { error: res.data.error, data: res.data.data };
};

export const useGetAllStoreRequisitionCodes = () => {
  const { data, error, ...rest } = useSWR(
    "/api/store-requisitions?filter=codes",
    fetcher
  );

  return { data, error, loading: !data && !error, ...rest };
};

export const useDeleteStoreRequisitionById = async (id) => {
  const res = await axios.delete(`/api/store-requisitions/${id}`);
  mutate("/api/store-requisitions");
  return { error: res.data.error, data: res.data.data };
};

export const useGetStoreRequisitionById = (id) => {
  const { data, error, ...rest } = useSWR(
    id ? `/api/store-requisitions/${id}` : null,
    fetcher
  );
  return { data, error, loading: !data && !error, ...rest };
};

export const useUpdateStoreRequisitionById = async (
  id,
  item,
  reqQty,
  warehouse,
  notes
) => {
  const res = await axios.patch(`/api/store-requisitions/${id}`, {
    item,
    reqQty,
    warehouse,
    notes,
  });
  mutate("/api/store-requisitions");
  return { error: res.data.error, data: res.data.data };
};
