import Customapi from '@/shared/config/api';
import { ScheduleItem } from '@/shared/types/schedule';
import { PendingTaskItem } from '@/shared/types/task';
import { NoticeItem } from '@/shared/types/notice';
import { ClassInfoProps } from '@/shared/types/Class/classroom';

export const ClassData = async (classRoomId: string): Promise<ClassInfoProps> => {
  const res = await Customapi.get(`/api/class/${classRoomId}`);
  return res.data;
};

export const PendingTasks = async (): Promise<PendingTaskItem[]> => {
  const res = await Customapi.get(`/api/tasks/pending`);
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