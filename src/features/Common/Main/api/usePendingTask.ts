import CustomApi from "@/shared/config/api";
import { PendingTaskItem } from '@/shared/types/task';

const normalizeDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    console.warn('date:', dateStr);
    return dateStr;
  }
  return date.toISOString().split('T')[0]; // yyyy-mm-dd 형식으로 정규화
};

export const pendingTasksApi = {
  getPendingTasks: async (): Promise<PendingTaskItem[] | number> => {
    try {
      const res = await CustomApi.get(`/api/assignments/me`);
      if (res.status !== 200) return res.status;

      if (!Array.isArray(res.data)) {
        console.error('API 응답이 배열이 아님:', res.data);
        return [];
      }

      const normalizedData = res.data.map((task: PendingTaskItem) => ({
        ...task,
        dueDate: normalizeDate(task.dueDate),
      }));

      return normalizedData;
    } catch (error) {
      console.error('미제출 과제 조회 실패:', error);
      throw error;
    }
  },

  getAllTasks: async (classId: string): Promise<PendingTaskItem[] | number> => {
    try {
      const res = await CustomApi.get(`/api/assignments/${classId}/all`);
      if (res.status !== 200) return res.status;

      const normalizedData = res.data.map((task: PendingTaskItem) => ({
        ...task,
        dueDate: normalizeDate(task.dueDate),
      }));

      return normalizedData;
    } catch (error) {
      console.error('전체 과제 조회 실패:', error);
      throw error;
    }
  },

  submitTask: async (submissionId: string): Promise<any | number> => {
    try {
      const res = await CustomApi.patch(`/api/submissions/${submissionId}/submit`);
      if (res.status !== 200) return res.status;
      return res.data;
    } catch (error) {
      console.error('과제 제출 실패:', error);
      throw error;
    }
  },
};