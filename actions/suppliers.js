import useSWR, { mutate } from "swr";
import { fetcher } from "@/actions";
import axios from "axios";

export const useGetAllSuppliers = () => {
  const { data, error, ...rest } = useSWR("/api/suppliers", fetcher);

  return { data, error, loading: !data && !error, ...rest };
};

export const useCreateSupplier = async (
  code,
  company,
  name,
  type,
  opnBalance,
  // item,
  address,
  phone,
  status,
  group,
  image,
  notes
) => {
  const res = await axios.post("/api/suppliers", {
    code,
    company,
    name,
    type,
    opnBalance,
    // item,
    address,
    phone,
    status,
    group,
    image,
    notes,
  });
  mutate("/api/suppliers");
  return { error: res.data.error, data: res.data.data };
};

export const useGetSupplierCodes = () => {
  const { data, error, ...rest } = useSWR(
    "/api/suppliers?filter=codes",
    fetcher
  );

  return { data, error, loading: !data && !error, ...rest };
};
