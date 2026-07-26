import { api } from "@/services/api";
import { API } from "@/constants";


export type Category = {
  slug: string;
  name: string;
  url: string;
};




export async function fetchCategories(): Promise<Category[]> {
  const data = await api.get<Category[]>(
    API.ENDPOINTS.PRODUCTS + API.ENDPOINTS.CATEGORIES
  );

  return  data.slice(0,4 );;
}

export async function fetchALLCategories(): Promise<Category[]> {
  const data = await api.get<Category[]>(
       API.ENDPOINTS.PRODUCTS + API.ENDPOINTS.CATEGORIES
  );

  return  data;;
}

