import { BasicInfoData } from '@/shared/types/classroom';

export const BasicInfoDatas: BasicInfoData = {
  subjectCategory: '수학',
  period: '2교시',
  grade: '3학년',
  classNum: '2반',
  roomName: '3-2 수학실',
  description: '심화 수학 수업을 위한 교실입니다.',
};

export const subjectCategoryOptions = [
  { value: 'korean', label: '국어' },
  { value: 'math', label: '수학' },
  { value: 'english', label: '영어' },
  { value: 'science', label: '과학' },
  { value: 'social', label: '사회' },
];

export const periodOptions = [
  { value: '1', label: '1교시' },
  { value: '2', label: '2교시' },
  { value: '3', label: '3교시' },
  { value: '4', label: '4교시' },
];

export const gradeOptions = [
  { value: '1', label: '1학년' },
  { value: '2', label: '2학년' },
  { value: '3', label: '3학년' },
];

export const classOptions = [
  { value: '1', label: '1반' },
  { value: '2', label: '2반' },
  { value: '3', label: '3반' },
  { value: '4', label: '4반' },
];