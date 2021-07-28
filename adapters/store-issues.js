import useSWR, { mutate } from "swr";
import { fetcher } from "@/adapters";
import axios from "axios";

export const useGetAllStoreIssues = () => {
  const { data, error, ...rest } = useSWR("/api/store-issues", fetcher, {
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

export const useCreateStoreIssue = async ({
  date,
  code,
  reqCode,
  item,
  issRate,
  issQty,
  warehouse,
  notes,
  isPosted,
}) => {
  const res = await axios.post("/api/store-issues", {
    date,
    code,
    reqCode,
    item,
    issRate,
    issQty,
    warehouse,
    notes,
    isPosted,
  });
  mutate("/api/store-issues");
  return { error: res.data.error, data: res.data.data };
};

export const useGetStoreIssueCodes = () => {
  const { data, error, ...rest } = useSWR(
    "/api/store-issues?filter=codes",
    fetcher,
    {
      revalidateOnFocus: false,
    }
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
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
  return { data, error, loading: !data && !error, ...rest };
};

export const useUpdateStoreIssueById = async ({
  id,
  date,
  reqCode,
  item,
  issRate,
  issQty,
  warehouse,
  notes,
  isPosted,
}) => {
  const res = await axios.patch(`/api/store-issues/${id}`, {
    date,
    reqCode,
    item,
    issRate,
    issQty,
    warehouse,
    notes,
    isPosted,
  });
  mutate("/api/store-issues");
  return { error: res.data.error, data: res.data.data };
};
