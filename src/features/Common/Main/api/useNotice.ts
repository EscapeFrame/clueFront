import CustomApi from "@/shared/config/api";
import { NoticeItem, PostNoticeItem, DetailNoticeItem } from "@/shared/types/notice";
import { AxiosError } from "axios";

// 아직 적힌거 없음
export const noticeApi = {
  // 전체 공지사항 목록 조회
  getAllNotices: async () => {
    try {
      const res = await CustomApi.get("/api/notice");
      if (res.status !== 200) return res.status;
      return res.data;
    } catch (error) {
      console.error("전체 공지사항 조회 실패:", error);
      throw error;
    }
  },

  postNotice: async (data: PostNoticeItem) => {
    const formData = new FormData();

    // metadata를 JSON 문자열로 변환하여 추가
    formData.append(
      "metadata",
      new Blob([JSON.stringify(data.metadata)], { type: "application/json" }),
    );

    // 파일들을 추가. 파일이 없는 경우에도 빈 'files' 필드를 추가하여 서버에서 배열로 인식하도록 합니다.
    if (data.files && data.files.length > 0) {
      data.files.forEach((file) => {
        formData.append("files", file);
      });
    } else {
      formData.append("files", new Blob([]), '');
    }

    // FormData 전송 시 Content-Type을 undefined
    const response = await CustomApi.post("/api/notice", formData, {
      headers: { 'Content-Type': undefined },
    });

    console.log("공지사항 등록 응답:", response);
    return response.data;
  },

  patchNotice: async (data: {
    noticeId: string;
    metadata: PostNoticeItem['metadata'];
    files?: File[];
  }) => {
    const payload = {
      type: data.metadata.type,
      title: data.metadata.title,
      content: data.metadata.content,
    };

    try {
      const response = await CustomApi.patch(`/api/notice/${data.noticeId}`, payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error('Error patching notice:', error);
      return (error as AxiosError).response?.status || 500;
    }
  },
  // 특정 공지사항 상세 조회
  getNoticeDetail: async (noticeId: string): Promise<DetailNoticeItem | number> => {
    try {
      const res = await CustomApi.get(`/api/notice/${noticeId}`);
      if (res.status !== 200) return res.status;
      return res.data;
    } catch (error) {
      console.error("공지사항 상세 조회 실패:", error);
      throw error;
    }
  },

  // 공지사항 생성
  createNotice: async (
    noticeData: Partial<NoticeItem>,
  ): Promise<NoticeItem | number> => {
    try {
      const res = await CustomApi.post("/api/notice", noticeData);
      if (res.status !== 201) return res.status;
      return res.data;
    } catch (error) {
      console.error("공지사항 생성 실패:", error);
      throw error;
    }
  },

  // 공지사항 수정
  updateNotice: async (
    noticeId: string,
    noticeData: Partial<NoticeItem>,
  ): Promise<NoticeItem | number> => {
    try {
      const res = await CustomApi.patch(`/api/notice/${noticeId}`, noticeData);
      if (res.status !== 200) return res.status;
      return res.data;
    } catch (error) {
      console.error("공지사항 수정 실패:", error);
      throw error;
    }
  },

  // 공지사항 삭제
  deleteNotice: async (noticeId: string): Promise<number> => {
    try {
      const res = await CustomApi.delete(`/api/notice/${noticeId}`);
      if (res.status !== 200) return res.status;
      return res.status;
    } catch (error) {
      console.error("공지사항 삭제 실패:", error);
      throw error;
    }
  },

  // 공지사항 링크 조회
  getNoticeLink: async (noticeDocumentId: string): Promise<string | number> => {
    try {
      const res = await CustomApi.get(`/api/notice/link/${noticeDocumentId}`);
      if (res.status !== 200) return res.status;
      return res.data;
    } catch (error) {
      console.error("공지사항 링크 조회 실패:", error);
      throw error;
    }
  },

  // 공지사항 첨부파일 삭제
  deleteNoticeDocument: async (noticeId: string, noticeDocumentId: string): Promise<number> => {
    try {
      const res = await CustomApi.delete(`/api/notice/${noticeId}/document/${noticeDocumentId}`);
      return res.status;
    } catch (error) {
      console.error("공지사항 첨부파일 삭제 실패:", error);
      const axiosError = error as AxiosError;
      return axiosError.response?.status || 500;
    }
  },

  // 공지사항 수정 시 metadata + files 전송 (파일 또는 링크 추가 시 사용)
  postNoticeForUpdate: async (
    noticeId: string,
    metadata: PostNoticeItem['metadata'],
    files: File[],
  ): Promise<number> => {
    try {
      const formData = new FormData();

      // metadata JSON을 metadata 필드로 첨부
      formData.append(
        'metadata',
        new Blob([JSON.stringify({ fileInfo: metadata.fileInfo || [], urls: metadata.urls || [] })], { type: 'application/json' }),
      );

      if (files && files.length > 0) {
        files.forEach((file) => formData.append('files', file));
      } else {
        formData.append('files', new Blob([]), '');
      }

      const res = await CustomApi.post(`/api/notice/${noticeId}`, formData, {
        headers: { 'Content-Type': undefined },
      });
      return res.status;
    } catch (error) {
      console.error('공지사항 수정용 첨부파일 업로드 실패:', error);
      const axiosError = error as AxiosError;
      return axiosError.response?.status || 500;
    }
  },

  // 공지사항 파일 다운로드
  downloadNoticeFile: async (noticeDocumentId: string, filename: string): Promise<void | number> => {
    try {
      const res = await CustomApi.get(`/api/notice/download/${noticeDocumentId}`, {
        responseType: 'blob',
      });
      if (res.status !== 200) return res.status;

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename); // 파일 이름 설정
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("공지사항 파일 다운로드 실패:", error);
      throw error;
    }
  },
};
