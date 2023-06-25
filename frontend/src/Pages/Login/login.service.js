import { http } from "../../axios";

export const onLoginSubmit = async (values) => {
  debugger;
  return http({
    request: "connect",
    method: "POST",
    data: { ...values, type: "mysql" },
  });
};
