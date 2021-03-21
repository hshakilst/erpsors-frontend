import useSWR, { mutate } from "swr";
import { fetcher } from "@/actions";
import axios from "axios";

export const useGetAllStoreIssues = () => {
  const { data, error, ...rest } = useSWR("/api/store-issues", fetcher);

  return { data, error, loading: !data && !error, ...rest };
};

export const useCreateStoreIssue = async (
  code,
  reqCode,
  item,
  valueRate,
  issQty,
  warehouse,
  notes
) => {
  const res = await axios.post("/api/store-issues", {
    code,
    reqCode,
    item,
    valueRate,
    issQty,
    warehouse,
    notes,
  });
  mutate("/api/store-issues");
  return { error: res.data.error, data: res.data.data };
};

export const useGetStoreIssueCodes = () => {
  const { data, error, ...rest } = useSWR(
    "/api/store-issues?filter=codes",
    fetcher
  );

  return { data, error, loading: !data && !error, ...rest };
};

export const useDeleteStoreIssueById = async (id) => {
  const res = await axios.delete(`/api/store-issues/${id}`);
  mutate("/api/store-issues");
  return { error: res.data.error, data: res.data.data };
};

export const useGetStoreIssuesById = (id) => {
  const { data, error, ...rest } = useSWR(
    id ? `/api/store-issues/${id}` : null,
    fetcher
  );
  return { data, error, loading: !data && !error, ...rest };
};

export const useUpdateStoreIssuesById = async (
  id,
  reqCode,
  item,
  valueRate,
  issQty,
  warehouse,
  notes
) => {
  const res = await axios.patch(`/api/store-issues/${id}`, {
    reqCode,
    item,
    valueRate,
    issQty,
    warehouse,
    notes,
  });
  mutate("/api/store-issues");
  return { error: res.data.error, data: res.data.data };
};
