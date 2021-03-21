import useSWR, { mutate } from "swr";
import { fetcher } from "@/actions";
import axios from "axios";

export const useGetAllItems = () => {
  const { data, error, ...rest } = useSWR("/api/items", fetcher);

  return { data, error, loading: !data && !error, ...rest };
};

export const useGetItemById = (id) => {
  const { data, error, ...rest } = useSWR(
    id ? `/api/items/${id}` : null,
    fetcher
  );
  return { data, error, loading: !data && !error, ...rest };
};

export const useCreateItem = async (
  code,
  name,
  type,
  qty,
  valueRate,
  unit,
  status,
  group,
  image,
  notes
) => {
  const res = await axios.post("/api/items", {
    code,
    name,
    type,
    qty,
    valueRate,
    unit,
    status,
    group,
    image,
    notes,
  });
  mutate("/api/items");
  return { error: res.data.error, data: res.data.data };
};

export const useDeleteItemById = async (id) => {
  const res = await axios.delete(`/api/items/${id}`);
  mutate("/api/items");
  return { error: res.data.error, data: res.data.data };
};

export const useUpdateItemById = async (
  id,
  name,
  type,
  qty,
  valueRate,
  unit,
  status,
  group,
  image,
  notes
) => {
  const res = await axios.patch(`/api/items/${id}`, {
    name,
    type,
    qty,
    valueRate,
    unit,
    status,
    group,
    image,
    notes,
  });
  mutate("/api/items");
  return { error: res.data.error, data: res.data.data };
};

export const useGetAllItemCodes = () => {
  const { data, error, ...rest } = useSWR("/api/items?filter=codes", fetcher);

  return { data, error, loading: !data && !error, ...rest };
};
