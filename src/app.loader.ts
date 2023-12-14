import { useQuery } from "react-query";
import { getThacMac, getSuyDienLuat, getDieuLuat, getListDieuLuat } from "./services/app.service";

export const CACHE_KEYS = {
    InforThacMac: "InforThacMac",
    InforSuyDien: "InforSuyDien",
    InforDieuLuat: "InforDieuLuat",
    InforListDieuLuat: "InforListDieuLuat",
  }
// query
export const useGetThacMac =  (data:any) => {
    return useQuery([CACHE_KEYS.InforThacMac,data], () => getThacMac(data));
  } 
export const useGetSuyDien =  (data:any) => {
    return useQuery([CACHE_KEYS.InforSuyDien,data], () => getSuyDienLuat(data));
  }   
export const useGetDieuLuat =  (data:any) => {
    return useQuery([CACHE_KEYS.InforDieuLuat,data], () => getDieuLuat(data));
  }   
export const useGetListDieuLuat =  () => {
    return useQuery([CACHE_KEYS.InforListDieuLuat], () => getListDieuLuat());
  }   