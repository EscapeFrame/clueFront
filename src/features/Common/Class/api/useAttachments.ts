import CustomApi from '@/shared/config/api';
import { AssignmentAttachment } from '@/shared/types/Class/Assignment/Attachment';

const API_BASE_URL = '/api/assignments';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const AssignmentAttachmentApi = {
  getAll: async (assignmentId: number): Promise<AssignmentAttachment[]> => {
    try {
      const res = await CustomApi.get<AssignmentAttachment[]>(
        `${API_BASE_URL}/${assignmentId}/attachment`,
        { headers: getAuthHeader() }
      );
      return res.data;
    } catch (error) {
      console.error('첨부파일 조회 실패:', error);
      return [];
    }
  },

  uploadFile: async (assignmentId: number, file: File): Promise<AssignmentAttachment[]> => {
    try {
      const formData = new FormData();
      formData.append('files', file);

      const res = await CustomApi.post<AssignmentAttachment[]>(
        `${API_BASE_URL}/${assignmentId}/file`,
        formData,
        {
          headers: {
            ...getAuthHeader(),
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return res.data;
    } catch (error) {
      console.error('첨부파일 업로드 실패:', error);
      return [];
    }
  },

  addLink: async (assignmentId: number, link: { type: string; value: string }): Promise<AssignmentAttachment | null> => {
    try {
      const res = await CustomApi.post<AssignmentAttachment>(
        `${API_BASE_URL}/${assignmentId}/link`,
        link,
        { headers: getAuthHeader() }
      );
      return res.data;
    } catch (error) {
      console.error('링크 추가 실패:', error);
      return null;
    }
  },

  delete: async (attachmentId: number): Promise<{ message: string } | null> => {
    try {
      const res = await CustomApi.delete<{ message: string }>(
        `${API_BASE_URL}/attachment/${attachmentId}`,
        { headers: getAuthHeader() }
      );
      return res.data;
    } catch (error) {
      console.error('첨부파일/링크 삭제 실패:', error);
      return null;
    }
  },
};