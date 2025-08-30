import CustomApi from '@/shared/config/api';

export const classApi = {
  // 전체 학습실 조회 (검색어 지원)
  getClasses: async (search?: string) => {
    try {
      const res = await CustomApi.get('/api/class', {
        params: search ? { search } : {},
      });
      if (res.status !== 200) return res.status;
      return Array.isArray(res.data) ? res.data : [];
    } catch (err) {
      console.error('학습실 조회 실패:', err);
      throw err;
    }
  },

  // 학습실 참여
  joinClass: async (code: string) => {
    try {
      const res = await CustomApi.post('/api/class/join', { classCode: code });
      if (res.status !== 200) return res.status;
      return res.data;
    } catch (err) {
      console.error('학습실 참여 실패:', err);
      throw err;
    }
  },

  // 학습실 생성
  createClass: async (name: string, description?: string) => {
    try {
      const res = await CustomApi.post('/api/class', { name, description });
      if (res.status !== 200) return res.status;
      return res.data;
    } catch (err) {
      console.error('학습실 생성 실패:', err);
      throw err;
    }
  },

  // 학습실 삭제
  deleteClass: async (classId: string | number) => {
    try {
      const res = await CustomApi.delete(`/api/class/${classId}`);
      if (res.status !== 200) return res.status;
      return res.data;
    } catch (err) {
      console.error('학습실 삭제 실패:', err);
      throw err;
    }
  },
};