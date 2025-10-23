import CustomApi from "@/shared/config/api";
import { NoticeItem } from "@/shared/types/notice";

// 아직 적힌거 없음
export const noticeApi = {
  // 전체 공지사항 목록 조회
  getAllNotices: async () => {
    try {
      const res = await CustomApi.get("/api/notices/all");
      if (res.status !== 200) return res.status;
      return res.data;
    } catch (error) {
      console.error("전체 공지사항 조회 실패:", error);
      throw error;
    }
  },

  // 특정 공지사항 상세 조회
  getNoticeDetail: async (noticeId: number): Promise<NoticeItem | number> => {
    try {
      const res = await CustomApi.get(`/api/notice/${noticeId}`);
      if (res.status !== 200) return res.status;
      return res.data;
    } catch (error) {
      console.error("공지사항 상세 조회 실패:", error);
      throw error;
    }
  },
};
