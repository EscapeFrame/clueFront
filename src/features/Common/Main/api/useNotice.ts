import CustomApi from "@/shared/config/api";
import { NoticeItem } from '@/shared/types/notice';

export const noticeApi = {
  // 서비스 공지 목록 조회
  getServiceNotices: async (): Promise<NoticeItem[] | number> => {
    try {
      const res = await CustomApi.get('/api/notices/service');
      if (res.status !== 200) return res.status;
      return res.data;
    } catch (error) {
      console.error('서비스 공지 조회 실패:', error);
      throw error;
    }
  },

  // 학교 공지 목록 조회
  getSchoolNotices: async (): Promise<NoticeItem[] | number> => {
    try {
      const res = await CustomApi.get('/api/notices/school');
      if (res.status !== 200) return res.status;
      return res.data;
    } catch (error) {
      console.error('학교 공지 조회 실패:', error);
      throw error;
    }
  },

  // 일정 안내 목록 조회
  getScheduleNotices: async (): Promise<NoticeItem[] | number> => {
    try {
      const res = await CustomApi.get('/api/notices/schedule');
      if (res.status !== 200) return res.status;
      return res.data;
    } catch (error) {
      console.error('일정 안내 조회 실패:', error);
      throw error;
    }
  },

  // 특정 공지사항 상세 조회
  getNoticeDetail: async (noticeId: number): Promise<NoticeItem | number> => {
    try {
      const res = await CustomApi.get(`/api/notices/${noticeId}`);
      if (res.status !== 200) return res.status;
      return res.data;
    } catch (error) {
      console.error('공지사항 상세 조회 실패:', error);
      throw error;
    }
  },

  // 전체 공지사항 목록 조회
  getAllNotices: async (): Promise<{
    service: NoticeItem[];
    school: NoticeItem[];
    schedule: NoticeItem[];
  } | number> => {
    try {
      const res = await CustomApi.get('/api/notices/all');
      if (res.status !== 200) return res.status;
      return res.data;
    } catch (error) {
      console.error('전체 공지사항 조회 실패:', error);
      throw error;
    }
  },
};