import useSWR, { mutate } from "swr";
import { fetcher } from "@/adapters";
import axios from "axios";

export const useGetAllSuppliers = () => {
  const { data, error, ...rest } = useSWR("/api/suppliers", fetcher, {
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

export const useCreateSupplier = async (
  code,
  company,
  name,
  opnBalance,
  phone,
  address,
  type,
  status,
  group,
  image,
  notes
) => {
  const res = await axios.post("/api/suppliers", {
    code,
    company,
    name,
    opnBalance,
    phone,
    address,
    type,
    status,
    group,
    image,
    notes,
  });
  mutate("/api/suppliers");
  return { error: res.data.error, data: res.data.data };
};

export const useGetAllSupplierCodes = () => {
  const { data, error, ...rest } = useSWR(
    "/api/suppliers?filter=codes",
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return { data, error, loading: !data && !error, ...rest };
};

export const useDeleteSupplierById = async (id) => {
  const res = await axios.delete(`/api/suppliers/${id}`);
  mutate("/api/suppliers");
  return { error: res.data.error, data: res.data.data };
};

export const useGetSupplierById = (id) => {
  const { data, error, ...rest } = useSWR(
    id ? `/api/suppliers/${id}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
  return { data, error, loading: !data && !error, ...rest };
};

export const useUpdateSupplierById = async (
  id,
  company,
  name,
  opnBalance,
  phone,
  address,
  type,
  status,
  group,
  image,
  notes
) => {
  const res = await axios.patch(`/api/suppliers/${id}`, {
    company,
    name,
    opnBalance,
    phone,
    address,
    type,
    status,
    group,
    image,
    notes,
  });
  mutate("/api/suppliers");
  return { error: res.data.error, data: res.data.data };
};
