import { axiosInstance } from "../../axios";
import axios from "axios";
import { EnvironmentConstants } from "../../utils/Constants";

export const onLoginSubmit = async (values) => {
  return axiosInstance.post(
    `connect`,
    { ...values, type: "mysql" },
    {
      headers: { "X-User-Id": null },
    }
  );
};
