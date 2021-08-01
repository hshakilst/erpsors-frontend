import useSWR, { mutate } from "swr";
import { fetcher } from "@/adapters";
import axios from "axios";

export const useGetAllStoreRequisitions = () => {
  const { data, error, ...rest } = useSWR("/api/store-requisitions", fetcher, {
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

export const useCreateStoreRequisition = async ({
  date,
  code,
  item,
  reqQty,
  warehouse,
  notes,
  reqDate,
}) => {
  const res = await axios.post("/api/store-requisitions", {
    date,
    code,
    item,
    reqQty,
    warehouse,
    notes,
    reqDate,
  });
  mutate("/api/store-requisitions");
  return { error: res.data.error, data: res.data.data };
};

export const useGetAllStoreRequisitionCodes = () => {
  const { data, error, ...rest } = useSWR(
    "/api/store-requisitions?filter=codes",
    fetcher,
    {
      revalidateOnFocus: false,
    }
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
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
  return { data, error, loading: !data && !error, ...rest };
};

export const useUpdateStoreRequisitionById = async ({
  id,
  date,
  item,
  reqQty,
  warehouse,
  notes,
  isApproved,
}) => {
  const res = await axios.patch(`/api/store-requisitions/${id}`, {
    date,
    item,
    reqQty,
    warehouse,
    notes,
    isApproved,
  });
  mutate("/api/store-requisitions");
  return { error: res.data.error, data: res.data.data };
};
