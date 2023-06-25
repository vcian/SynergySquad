import { getLocalStorageKey } from "./utils/local-storage.service";
import axios from "axios";

// export const axiosInstance = axios.create({
//   baseURL: "http://3.111.147.181:3000/",
//   headers: {
//     session_id: getLocalStorageKey("session_id"),
//   },
// });

export const http = ({
  request,
  method = "GET",
  data = null,
  headers = {},
}) => {
  return axios({
    url: `http://3.111.147.181:3000/${request}`,
    //url: `http://192.168.20.252:3000/${request}`,
    method,
    data,
    headers: {
      session_id: getLocalStorageKey("session_id"),
    },
  });
};
