import useSWR, { mutate } from "swr";
import { fetcher } from "@/adapters";
import axios from "axios";

export const useGetUser = () => {
  const { data, error, ...rest } = useSWR("/api/user", fetcher);
  return { data, error, loading: !data && !error, ...rest };
};

export const useLogOut = async () => {
  const res = await axios.get("/api/logout");
  mutate("/api/user", undefined);
  return { error: res.data.error, data: res.data.data };
};
