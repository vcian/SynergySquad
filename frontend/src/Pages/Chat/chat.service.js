import { http } from "../../axios";

export async function postChat(values) {
  debugger;
  return http({ request: "chat", data: values, method: "POST" });
}
