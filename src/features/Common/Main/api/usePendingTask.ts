import CustomApi from "@/shared/config/api";
import { PendingTaskItem } from '@/shared/types/task';

export const pendingTasksApi = {
  // 미제출 과제 목록 조회
  getPendingTasks: async (): Promise<PendingTaskItem[] | number> => {
    try {
      const res = await CustomApi.get('/api/tasks/pending');
      if (res.status !== 200) return res.status;
      return res.data;
    } catch (error) {
      console.error('미제출 과제 조회 실패:', error);
      throw error;
    }
  },

  // 모든 과제 목록 조회
  getAllTasks: async (): Promise<PendingTaskItem[] | number> => {
    try {
      const res = await CustomApi.get('/api/tasks');
      if (res.status !== 200) return res.status;
      return res.data;
    } catch (error) {
      console.error('전체 과제 조회 실패:', error);
      throw error;
    }
  },

  // 새로운 과제 생성
  createTask: async (task: PendingTaskItem): Promise<any | number> => {
    try {
      const res = await CustomApi.post('/tasks', task);
      if (res.status !== 200) return res.status;
      return res.data;
    } catch (error) {
      console.error('과제 생성 실패:', error);
      throw error;
    }
  },

  // 과제 제출 완료 처리
  submitTask: async (taskIndex: number): Promise<any | number> => {
    try {
      const res = await CustomApi.patch(`/api/tasks/${taskIndex}/submit`);
      if (res.status !== 200) return res.status;
      return res.data;
    } catch (error) {
      console.error('과제 제출 실패:', error);
      throw error;
    }
  },
};