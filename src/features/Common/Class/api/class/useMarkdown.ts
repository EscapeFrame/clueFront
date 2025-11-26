import Customapi from '@/shared/config/api';

export const getMarkDown = async (documentId: string) => {
  const res = await Customapi.get(`/api/document/${documentId}/download`);
  if (res.status < 200 || res.status >= 300) {
    console.error(`질문 조회 실패: ${res.status}`);
    return [];
  }
  return res.data;
};