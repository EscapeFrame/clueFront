import Customapi from '@/shared/config/api';
import { ClassInfoProps } from '@/shared/types/class/class';
import { ScheduleItem } from '@/shared/types/timetable';
import { NoticeItem } from '@/shared/types/notice';

export const ClassData = async (classRoomId: string): Promise<ClassInfoProps> => {
  const res = await Customapi.get(`/api/classroom/${classRoomId}`);
  return res.data;
};

export const Notices = async (): Promise<NoticeItem[]> => {
  const res = await Customapi.get(`/api/notices`);
  return res.data;
};

export const STUSchedule = async (): Promise<ScheduleItem[]> => {
  const res = await Customapi.get(`/api/timetable/weekly`);
  return res.data;
};

export const fetchWeeklyTimeline = async (grade: string, classNumber: string): Promise<ScheduleItem[]> => {
  try {
    const res = await Customapi.get(`/api/timetable/weekly?grade=${grade}&classNumber=${classNumber}`);
    if (res.status !== 200) throw new Error(`스케줄 조회 실패: ${res.status}`);
    return res.data;
  } catch (error) {
    console.error('스케줄 조회 실패:', error);
    throw error;
  }
};