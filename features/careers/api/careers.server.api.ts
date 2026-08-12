import { api } from "@/services/server/api";

import { API } from "@/constants/api";
import type {
  Locale,
  TransalatedCareer,
  ResponseType,
  PutResponseType,
  ApplicationGetPayloadWithCareer

} from "@/types/index";
import type {
    AdminCareers,


  
} from "@/features/careers/types/index";
import { auth } from "@/lib/auth/auth";

export async function fetchCareers(
  locale: Locale,
): Promise<ResponseType<TransalatedCareer[]>> {

  const data = await api.get<ResponseType<TransalatedCareer[]>>(
    `${API.ENDPOINTS.CAREERS.ALL_CAREERS_BY_LOCALE}/${locale}`,
  );

  console.log("data: ", data);

  return data;
}

export async function careerBySlug(
  slug: string,
    locale: Locale,

): Promise<ResponseType<TransalatedCareer>> {
  const data = await api.get<ResponseType<TransalatedCareer>>(
    `${API.ENDPOINTS.CAREERS.CAREER_BY_SLUG_AND_LOCALE}/${locale}?slug=${slug}`,
   
  );

  return data;
}


export async function adminCareerById(
  id: string
): Promise<ResponseType<AdminCareers>> {
  return api.get<ResponseType<AdminCareers>>(
    `${API.ENDPOINTS.CAREERS.CAREER_BY_ID}/${id}`
  );
}

export async function fetchCareersWithApplications(
): Promise<ResponseType<ApplicationGetPayloadWithCareer[]>> {

  const data = await api.get<ResponseType<ApplicationGetPayloadWithCareer[]>>(
    `${API.ENDPOINTS.CAREERS.CAREERS_WITH_APPLICATIONS}`,
  );


  return data;
}