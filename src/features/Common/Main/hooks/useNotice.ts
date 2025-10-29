import { useState, useEffect, useCallback } from 'react';
import { noticeApi } from '@/features/Common/Main/api/useNotice';
import { NoticeItem, DetailNoticeItem, NoticeDocument } from '@/shared/types/notice';

interface UseNoticesReturn {
  serviceNotices: NoticeItem[];
  schoolNotices: NoticeItem[];
  scheduleNotices: NoticeItem[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useNotices = (): UseNoticesReturn => {
  const [serviceNotices, setServiceNotices] = useState<NoticeItem[]>([]);
  const [schoolNotices, setSchoolNotices] = useState<NoticeItem[]>([]);
  const [scheduleNotices, setScheduleNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllNotices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await noticeApi.getAllNotices();

      if (typeof result === 'number') {
        setError(`공지사항을 불러오는데 실패했습니다. (상태코드: ${result})`);
        setServiceNotices([]);
        setSchoolNotices([]);
        setScheduleNotices([]);
        return;
      }

      // type 기준으로 분류
      const service = result.filter((n: NoticeItem) => n.type === 'SERVICE');
      const school = result.filter((n: NoticeItem) => n.type === 'SCHOOL');
      const schedule = result.filter((n: NoticeItem) => n.type === 'SCHEDULE');

      setServiceNotices(service);
      setSchoolNotices(school);
      setScheduleNotices(schedule);
    } catch (err) {
      console.error('공지사항 조회 중 오류 발생:', err);
      setError('공지사항을 불러오는 중 오류가 발생했습니다.');
      setServiceNotices([]);
      setSchoolNotices([]);
      setScheduleNotices([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllNotices();
  }, [fetchAllNotices]);

  return {
    serviceNotices,
    schoolNotices,
    scheduleNotices,
    loading,
    error,
    refetch: fetchAllNotices,
  };
};

// 개별 공지사항 상세 조회 훅
interface UseNoticeDetailReturn {
  notice: DetailNoticeItem | null;
  loading: boolean;
  error: string | null;
  fetchNoticeDetail: (noticeId: string) => Promise<void>;
}

export const useNoticeDetail = (noticeId: string): UseNoticeDetailReturn => {
  const [notice, setNotice] = useState<DetailNoticeItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNoticeDetail = useCallback(async (noticeId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await noticeApi.getNoticeDetail(noticeId);
      
      if (typeof result === 'number') {
        setError(`공지사항을 불러오는데 실패했습니다. (상태코드: ${result})`);
        setNotice(null);
        return;
      }
      
      setNotice(result);
    } catch (err) {
      console.error('공지사항 상세 조회 중 오류 발생:', err);
      setError('공지사항을 불러오는 중 오류가 발생했습니다.');
      setNotice(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (noticeId) {
      fetchNoticeDetail(noticeId);
    }
  }, [noticeId, fetchNoticeDetail]);

  return {
    notice,
    loading,
    error,
    fetchNoticeDetail,
  };
};

// 공지사항 첨부파일 관련 훅
interface UseNoticeAttachmentsReturn {
  handleAttachmentClick: (document: NoticeDocument) => Promise<void>;
  handleDeleteAttachment: (noticeDocumentId: string) => Promise<void>;
}

export const useNoticeAttachments = (noticeId: string, onActionSuccess: () => void): UseNoticeAttachmentsReturn => {
  const handleAttachmentClick = async (document: NoticeDocument) => {
    if (document.type === 'FILE') {
      try {
        await noticeApi.downloadNoticeFile(document.noticeDocumentId, document.title);
      } catch (err) {
        alert('파일 다운로드에 실패했습니다.');
        console.error('File download error:', err);
      }
    } else if (document.type === 'LINK') {
      try {
        const link = await noticeApi.getNoticeLink(document.noticeDocumentId);
        if (typeof link === 'string') {
          window.open(link.startsWith('http') ? link : `https://${link}`, '_blank', 'noopener,noreferrer');
        } else {
          alert('링크를 가져오는데 실패했습니다.');
        }
      } catch (err) {
        alert('링크 열기에 실패했습니다.');
        console.error('Link open error:', err);
      }
    }
  };

  const handleDeleteAttachment = async (noticeDocumentId: string) => {
    if (window.confirm('정말로 이 첨부파일을 삭제하시겠습니까?')) {
      try {
        const status = await noticeApi.deleteNoticeDocument(noticeId, noticeDocumentId);
        if (status === 200) {
          alert('첨부파일이 삭제되었습니다.');
          onActionSuccess(); // 목록 새로고침
        } else {
          alert(`첨부파일 삭제에 실패했습니다. (에러코드: ${status})`);
        }
      } catch (err) {
        alert('첨부파일 삭제 중 오류가 발생했습니다.');
        console.error('Attachment delete error:', err);
      }
    }
  };

  return { handleAttachmentClick, handleDeleteAttachment };
};