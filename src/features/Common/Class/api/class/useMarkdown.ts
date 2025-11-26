import Customapi from '@/shared/config/api';

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

export const downloadDocument = async (documentId: string, filename: string) => {
  try {
    const res = await Customapi.get(`/api/document/${documentId}/download`, { 
      responseType: 'blob' 
    });
    
    if (res.status < 200 || res.status >= 300) {
      console.error(`파일 다운로드 실패: ${res.status}`);
      return false;
    }

    // Content-Disposition에서 파일명 추출 시도
    const contentDisposition = res.headers?.['content-disposition'] as string | undefined;
    let actualFilename = filename;
    
    if (contentDisposition) {
      const match = contentDisposition.match(/filename\*=UTF-8''(.+)|filename="?([^";]+)"?/);
      if (match) {
        actualFilename = decodeURIComponent(match[1] || match[2]);
      }
    }

    // Blob을 다운로드
    const blob = new Blob([res.data]);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = actualFilename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('파일 다운로드 중 오류:', error);
    return false;
  }
};