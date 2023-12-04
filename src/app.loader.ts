import { useQuery } from "react-query";
import { getThacMac, getSuyDienLuat, getDieuLuat } from "./services/app.service";

export const CACHE_KEYS = {
    InforThacMac: "InforThacMac",
    InforSuyDien: "InforSuyDien",
    InforDieuLuat: "InforDieuLuat",

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