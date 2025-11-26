import Customapi from '@/shared/config/api';

export const getDocumentInfo = async (documentId: string) => {
  // HEAD 요청으로 파일 정보만 먼저 확인
  try {
    const res = await Customapi.get(`/api/document/${documentId}/download`);
    
    if (res.status < 200 || res.status >= 300) {
      console.error(`문서 정보 조회 실패: ${res.status}`);
      return { filename: null, data: null };
    }
    
    // Content-Disposition 헤더에서 파일명 추출
    const contentDisposition = res.headers?.['content-disposition'] as string | undefined;
    let filename: string | null = null;
    
    if (contentDisposition) {
      const match = contentDisposition.match(/filename\*=UTF-8''(.+)|filename="?([^";]+)"?/);
      if (match) {
        filename = decodeURIComponent(match[1] || match[2]);
      }
    }
    
    return { filename, data: res.data };
  } catch (error) {
    console.error('문서 정보 조회 중 오류:', error);
    return { filename: null, data: null };
  }
};

export const getMarkDown = async (documentId: string) => {
  const res = await Customapi.get(`/api/document/${documentId}/download`);
  if (res.status < 200 || res.status >= 300) {
    console.error(`질문 조회 실패: ${res.status}`);
    return { data: null, filename: null };
  }
  
  // Content-Disposition 헤더에서 파일명 추출
  const contentDisposition = res.headers?.['content-disposition'] as string | undefined;
  let filename: string | null = null;
  
  if (contentDisposition) {
    const match = contentDisposition.match(/filename\*=UTF-8''(.+)|filename="?([^";]+)"?/);
    if (match) {
      filename = decodeURIComponent(match[1] || match[2]);
    }
  }
  
  return { data: res.data, filename };
};

export const downloadDocumentAsBlob = async (documentId: string) => {
  try {
    const res = await Customapi.get(`/api/document/${documentId}/download`, { 
      responseType: 'blob' 
    });
    
    if (res.status < 200 || res.status >= 300) {
      console.error(`파일 다운로드 실패: ${res.status}`);
      return null;
    }

    // Content-Disposition에서 파일명 추출
    const contentDisposition = res.headers?.['content-disposition'] as string | undefined;
    let filename = `document_${documentId}`;
    
    if (contentDisposition) {
      const match = contentDisposition.match(/filename\*=UTF-8''(.+)|filename="?([^";]+)"?/);
      if (match) {
        filename = decodeURIComponent(match[1] || match[2]);
      }
    }

    return { blob: res.data, filename };
  } catch (error) {
    console.error('파일 다운로드 중 오류:', error);
    return null;
  }
};