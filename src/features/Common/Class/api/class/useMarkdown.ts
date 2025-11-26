import Customapi from '@/shared/config/api';

export const getMarkDown = async (documentId: string) => {
  try {
    // responseType을 'text'로 설정하여 파일 내용을 텍스트로 받아옴
    const res = await Customapi.get(`/api/document/${documentId}/download`, {
      responseType: 'text'
    });
    
    console.log('[getMarkDown API] 응답 상태:', res.status);
    console.log('[getMarkDown API] 응답 데이터 타입:', typeof res.data);
    console.log('[getMarkDown API] 응답 데이터 길이:', res.data?.length);
    
    if (res.status < 200 || res.status >= 300) {
      console.error(`문서 조회 실패: ${res.status}`);
      return { content: '', title: '' };
    }
    
    // 파일 내용이 문자열로 반환됨
    if (typeof res.data === 'string') {
      return { 
        content: res.data, 
        title: '' // 제목은 별도 API나 state에서 관리
      };
    }
    
    // 혹시 객체로 반환되는 경우
    return res.data;
  } catch (error) {
    console.error('[getMarkDown API] 에러:', error);
    throw error;
  }
};