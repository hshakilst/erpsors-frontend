import useSWR from "swr";
import { fetcher } from "@/actions";

export const fetcherWithSession = (url, sessionCookie) =>
  fetch(url, {
    method: "post",
    body: JSON.stringify({ sessionCookie: sessionCookie }),
    headers: { "Content-Type": "application/json" },
  }).then(async (res) => {
    const result = await res.json();

    if (res.status !== 200) {
      return Promise.reject(result);
    } else {
      return result;
    }
  });

export const useGetUser = () => {
  const { data, error, ...rest } = useSWR("/api/user", fetcher);
  return { data, error, loading: !data && !error, ...rest };
};
