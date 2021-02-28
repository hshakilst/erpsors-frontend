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