import { useTimetable } from "@/features/Common/Main/api/TimeTable";

export const useSchedule = () => {
  const { data: schedule, isLoading: loading, error } = useTimetable();

  return {
    schedule: schedule || [],
    loading,
    error: error ? error.message : null,
  };
};