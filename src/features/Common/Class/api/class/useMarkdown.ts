import Customapi from '@/shared/config/api';

export const getDocumentInfo = async (documentId: string) => {
  // HEAD 요청으로 파일 정보만 먼저 확인
  try {
    console.log('[API] Getting document info for:', documentId);
    const res = await Customapi.get(`/api/document/${documentId}/download`);
    
    console.log('[API] Response status:', res.status);
    console.log('[API] Response headers:', res.headers);
    
    if (res.status < 200 || res.status >= 300) {
      console.error(`[API] 문서 정보 조회 실패: ${res.status}`);
      return { filename: null, data: null, contentType: null };
    }
    
    // Content-Disposition 헤더에서 파일명 추출
    const contentDisposition = res.headers?.['content-disposition'] as string | undefined;
    const contentType = res.headers?.['content-type'] as string | undefined;
    console.log('[API] Content-Disposition:', contentDisposition);
    console.log('[API] Content-Type:', contentType);
    
    let filename: string | null = null;
    
    if (contentDisposition) {
      const match = contentDisposition.match(/filename\*=UTF-8''(.+)|filename="?([^";]+)"?/);
      if (match) {
        filename = decodeURIComponent(match[1] || match[2]);
      }
    }
    
    console.log('[API] Extracted filename:', filename);
    console.log('[API] Data type:', typeof res.data);
    
    return { filename, data: res.data, contentType };
  } catch (error) {
    console.error('[API] 문서 정보 조회 중 오류:', error);
    return { filename: null, data: null, contentType: null };
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
    console.log('[API] Starting blob download for:', documentId);
    const res = await Customapi.get(`/api/document/${documentId}/download`, { 
      responseType: 'blob' 
    });
    
    console.log('[API] Blob response status:', res.status);
    console.log('[API] Blob response headers:', res.headers);
    console.log('[API] Blob data type:', typeof res.data);
    console.log('[API] Blob data:', res.data);
    
    if (res.status < 200 || res.status >= 300) {
      console.error(`[API] 파일 다운로드 실패: ${res.status}`);
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

    console.log('[API] Blob filename:', filename);
    
    return { blob: res.data, filename };
  } catch (error) {
    console.error('[API] 파일 다운로드 중 오류:', error);
    return null;
  }
};