import axios from "axios";

export const fetcher = (url) =>
  axios.get(url).then((res) => {
    if (res.status !== 200) {
      return Promise.reject(res.data);
    } else {
      return res.data;
    }
  });

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

// export const fetcherWithPostData = (url, data) =>
//   console.log(JSON.stringify(data));
// fetch(url, {
//   method: "post",
//   body: JSON.stringify(data),
//   headers: { "Content-Type": "application/json" },
// }).then(async (res) => {
//   const result = await res.json();

//   if (res.status !== 200) {
//     return Promise.reject(result);
//   } else {
//     return result;
//   }
// });
