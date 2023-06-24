import { axiosInstance } from "../../axios";

export async function postChat(values) {
  return axiosInstance.post("chat", values);
}
