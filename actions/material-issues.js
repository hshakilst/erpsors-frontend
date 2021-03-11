import useSWR, { mutate } from "swr";
import { fetcher } from "@/actions";
import axios from "axios";

export const useGetAllMaterialIssues = () => {
  const { data, error, ...rest } = useSWR("/api/material-issues", fetcher);

  return { data, error, loading: !data && !error, ...rest };
};

export const useCreateMaterialIssue = async (
  code,
  reqCode,
  item,
  valueRate,
  issQty,
  warehouse,
  notes
) => {
  const res = await axios.post("/api/material-issues", {
    code,
    reqCode,
    item,
    valueRate,
    issQty,
    warehouse,
    notes,
  });
  mutate("/api/material-issues");
  return { error: res.data.error, data: res.data.data };
};

export const useGetMaterialIssueCodes = () => {
  const { data, error, ...rest } = useSWR(
    "/api/material-issues?filter=codes",
    fetcher
  );

  return { data, error, loading: !data && !error, ...rest };
};