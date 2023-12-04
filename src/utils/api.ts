import axios from "axios";

export const apiClient =  axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 20000,
});

export const filterEmptyString = (params: Record<string, any>) => {
  const result: Record<string, any> = {};
  Object.entries(params).forEach(([key, value]) => {
    if (value !== "") {
      if (typeof value === "string") {
        result[key] = value.trim();
      } else {
        result[key] = value;
      }
    }
  });

  return result;
};