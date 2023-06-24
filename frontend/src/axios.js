import { getLocalStorageKey } from "./utils/local-storage.service";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "X-User-Id": getLocalStorageKey("x-user-id"),
  },
});
