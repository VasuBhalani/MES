import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",  // <-- add base URL here
  withCredentials: true,
});

export const apiConnector = (method, url, bodyData, headers, params) => {
  return axiosInstance({
    method: method,
    url: url,               // url here is the endpoint path, e.g. '/auth/login'
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};
