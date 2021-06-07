import useSWR, { mutate } from "swr";
import { fetcher } from "@/adapters";
import axios from "axios";

export const useGetAllItems = () => {
  const { data, error, ...rest } = useSWR("/api/items", fetcher, {revalidateOnFocus:false,});

  return { data, error, loading: !data && !error, ...rest };
};

export const useGetItemById = (id) => {
  const { data, error, ...rest } = useSWR(
    id ? `/api/items/${id}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
  return { data, error, loading: !data && !error, ...rest };
};

export const useCreateItem = async ({
  opnDate,
  code,
  name,
  type,
  qty,
  totalAmount,
  valueRate,
  unit,
  status,
  shelfLife,
  group,
  image,
  notes,
  warehouse
}) => {
  const res = await axios.post("/api/items", {
    opnDate,
    code,
    name,
    type,
    qty,
    totalAmount,
    valueRate,
    unit,
    status,
    shelfLife,
    group,
    image,
    notes,
    warehouse
  });
  mutate("/api/items");
  return { error: res.data.error, data: res.data.data };
};

export const useDeleteItemById = async (id) => {
  const res = await axios.delete(`/api/items/${id}`);
  mutate("/api/items");
  return { error: res.data.error, data: res.data.data };
};

export const useUpdateItemById = async ({
  id,
  opnDate,
  name,
  type,
  qty,
  totalAmount,
  valueRate,
  unit,
  status,
  shelfLife,
  group,
  image,
  notes,
  warehouse
}) => {
  const res = await axios.patch(`/api/items/${id}`, {
    opnDate,
    name,
    type,
    qty,
    totalAmount,
    valueRate,
    unit,
    status,
    shelfLife,
    group,
    image,
    notes,
    warehouse
  });
  mutate("/api/items");
  return { error: res.data.error, data: res.data.data };
};

export const useGetAllItemCodes = () => {
  const { data, error, ...rest } = useSWR("/api/items?filter=codes", fetcher, {
    revalidateOnFocus: false,
  });

  return { data, error, loading: !data && !error, ...rest };
};
