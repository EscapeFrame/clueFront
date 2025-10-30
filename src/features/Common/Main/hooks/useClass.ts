import { useQuery } from "@tanstack/react-query";
import Customapi from '@/shared/config/api';
import { ClassResponse } from "@/shared/types/Class/classroom";

const SIX_HOURS_IN_MS = 6 * 60 * 60 * 1000;

const fetchMyClasses = async (search?: string): Promise<ClassResponse[]> => {
  const response = await Customapi.get("/api/class", {
    params: search ? { search } : {},
  });
  if (response.status !== 200) {
    throw new Error(`서버 에러: ${response.status}`);
  }
  return Array.isArray(response.data) ? response.data : [];
};

export const useMyClasses = (search?: string) => {
  return useQuery<ClassResponse[], Error>({
    queryKey: ["myClasses", search],
    queryFn: () => fetchMyClasses(search),
    staleTime: SIX_HOURS_IN_MS,
  });
};
