import { useQuery } from "@tanstack/react-query";
import Customapi from "@/shared/config/api";
import { ScheduleItem } from "@/shared/types/schedule";

const SIX_HOURS_IN_MS = 6 * 60 * 60 * 1000;

const fetchWeeklyTimetable = async (): Promise<ScheduleItem[]> => {
  const response = await Customapi.get("/api/timetable/weekly");
  if (response.status !== 200) {
    throw new Error(`서버 에러: ${response.status}`);
  }
  return Array.isArray(response.data) ? response.data : [];
};

export const useTimetable = () => {
  return useQuery<ScheduleItem[], Error>({
    queryKey: ["timetable", "weekly"],
    queryFn: fetchWeeklyTimetable,
    staleTime: SIX_HOURS_IN_MS, // 6시간 동안 데이터를 fresh 상태로 유지
    gcTime: SIX_HOURS_IN_MS * 2, // 12시간 동안 캐시 유지
  });
};