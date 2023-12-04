import { apiClient } from "../utils/api";

export const getThacMac= async (data:any) => {
    const result = await apiClient.get(`http://127.0.0.1:8000/thacmac/${data.thacMac}`);
    return result.data;
}
export const getSuyDienLuat= async (data:any) => {
    const result = await apiClient.get(`http://127.0.0.1:8000/suydien/${data.suydien}`);
    return result.data;
}
export const getDieuLuat= async (data:any) => {
    const result = await apiClient.get(`http://127.0.0.1:8000/dieuluat/${data.dieuluat}`);
    return result.data;
}