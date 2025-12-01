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
    console.log('[API] Blob.type:', res.data?.type);
    
    if (res.status < 200 || res.status >= 300) {
      console.error(`[API] 파일 다운로드 실패: ${res.status}`);
      return null;
    }

    // Content-Disposition에서 파일명 추출
    const contentDisposition = res.headers?.['content-disposition'] as string | undefined;
    const contentType = res.headers?.['content-type'] as string | undefined;
    let filename = `document_${documentId}`;
    
    console.log('[API] Content-Disposition:', contentDisposition);
    
    if (contentDisposition) {
      // filename*=UTF-8''... 형식 먼저 시도 (가장 정확함)
      const utf8Match = contentDisposition.match(/filename\*=UTF-8''([^;,\s]+)/i);
      if (utf8Match) {
        try {
          filename = decodeURIComponent(utf8Match[1].trim());
          console.log('[API] Extracted filename from filename*:', filename);
        } catch (e) {
          console.error('[API] Failed to decode filename*:', e);
        }
      } else {
        // filename="..." 형식 시도
        const quotedMatch = contentDisposition.match(/filename="([^"]+)"/i);
        if (quotedMatch) {
          const encodedName = quotedMatch[1];
          console.log('[API] Found quoted filename:', encodedName);
          
          // RFC 2047 인코딩 처리 (=?UTF-8?Q?...?=)
          if (encodedName.includes('=?UTF-8?Q?')) {
            try {
              const decoded = encodedName
                .replace(/=\?UTF-8\?Q\?/gi, '')
                .replace(/\?=/g, '')
                .replace(/=([0-9A-F]{2})/gi, (_, hex) => {
                  return String.fromCharCode(parseInt(hex, 16));
                })
                .replace(/_/g, ' ');
              filename = decoded;
              console.log('[API] Decoded RFC 2047 filename:', filename);
            } catch (e) {
              console.error('[API] Failed to decode RFC 2047 filename:', e);
              filename = encodedName;
            }
          } else {
            filename = encodedName;
          }
        } else {
          // filename=... (따옴표 없음) 형식 시도
          const unquotedMatch = contentDisposition.match(/filename=([^;,\s]+)/i);
          if (unquotedMatch) {
            filename = unquotedMatch[1].trim();
            console.log('[API] Found unquoted filename:', filename);
          }
        }
      }
    }
    
    // 파일명이 여전히 없고 Content-Type이 있으면 확장자 추가
    if (filename.startsWith('document_') && contentType) {
      const extensionMap: Record<string, string> = {
        'image/png': '.png',
        'image/jpeg': '.jpg',
        'image/gif': '.gif',
        'image/webp': '.webp',
        'image/svg+xml': '.svg',
        'application/pdf': '.pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation': '.pptx',
        'application/msword': '.doc',
        'application/vnd.ms-excel': '.xls',
        'application/vnd.ms-powerpoint': '.ppt',
      };
      
      const extension = extensionMap[contentType];
      if (extension && !filename.endsWith(extension)) {
        filename += extension;
        console.log('[API] Added extension from Content-Type:', filename);
      }
    }

    console.log('[API] Blob filename:', filename);
    console.log('[API] Content-Type:', contentType);
    
    // Blob의 타입이 올바르지 않은 경우 새로운 Blob 생성
    let blob = res.data;
    if (contentType && (!blob.type || blob.type === 'application/octet-stream')) {
      console.log('[API] Creating new blob with correct content-type:', contentType);
      blob = new Blob([res.data], { type: contentType });
      console.log('[API] New blob type:', blob.type);
    }
    
    return { blob, filename, contentType };
  } catch (error) {
    console.error('[API] 파일 다운로드 중 오류:', error);
    return null;
  }
};