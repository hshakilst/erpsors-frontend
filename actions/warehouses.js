import useSWR, { mutate } from "swr";
import { fetcher } from "@/actions";
import axios from "axios";

export const useGetAllWarehouses = () => {
  const { data, error, ...rest } = useSWR("/api/warehouses", fetcher);

  return { data, error, loading: !data && !error, ...rest };
};

export const useCreateWarehouses = async (
  code,
  name,
  type,
  // capacity,
  incharge,
  address,
  phone,
  status,
  group,
  image,
  notes
) => {
  const res = await axios.post("/api/warehouses", {
    code,
    name,
    type,
    // capacity,
    incharge,
    address,
    phone,
    status,
    group,
    image,
    notes,
  });
  mutate("/api/warehouses");
  return { error: res.data.error, data: res.data.data };
};

export const useGetAllWarehouseCodes = () => {
  const { data, error, ...rest } = useSWR(
    "/api/warehouses?filter=codes",
    fetcher
  );

  return { data, error, loading: !data && !error, ...rest };
};

export const useDeleteWarehouseById = async (id) => {
  const res = await axios.delete(`/api/warehouses/${id}`);
  mutate("/api/warehouses");
  return { error: res.data.error, data: res.data.data };
};

export const useGetWarehouseById = (id) => {
  const { data, error, ...rest } = useSWR(
    id ? `/api/warehouses/${id}` : null,
    fetcher
  );
  return { data, error, loading: !data && !error, ...rest };
};

export const useUpdateWarehouseById = async (
  id,
  name,
  type,
  // capacity,
  incharge,
  address,
  phone,
  status,
  group,
  image,
  notes
) => {
  const res = await axios.patch(`/api/warehouses/${id}`, {
    name,
    type,
    // capacity,
    incharge,
    address,
    phone,
    status,
    group,
    image,
    notes,
  });
  mutate("/api/warehouses");
  return { error: res.data.error, data: res.data.data };
};
