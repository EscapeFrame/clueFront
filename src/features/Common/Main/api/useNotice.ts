import CustomApi from '@/shared/config/api';
import { NoticeItem } from '@/shared/types/notice';

export const fetchServiceNotices = async (): Promise<NoticeItem[]> => {
  const res = await CustomApi.get('/api/notices/service'); // 실제 API 엔드포인트 확인
  if (res.status !== 200) throw new Error('서비스 공지 조회 실패');
  return res.data;
};

export const fetchSchoolNotices = async (): Promise<NoticeItem[]> => {
  const res = await CustomApi.get('/api/notices/school');
  if (res.status !== 200) throw new Error('학교 공지 조회 실패');
  return res.data;
};

export const fetchScheduleNotices = async (): Promise<NoticeItem[]> => {
  const res = await CustomApi.get('/api/notices/schedule');
  if (res.status !== 200) throw new Error('일정 안내 조회 실패');
  return res.data;
};