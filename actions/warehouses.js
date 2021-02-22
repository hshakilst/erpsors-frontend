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
  capacity,
  // items,
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
    capacity,
    // items,
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
