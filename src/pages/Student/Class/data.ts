import { ClassInfoProps } from '@/shared/types/classroom';
import Customapi from '@/shared/config/api';

/*
export const classData: ClassInfoProps = {
  name: 'Java를 자바라',
  sort: 'JAVA',
  description: '객체지향 프로그래밍의 기초부터 실전까지 배우는 JAVA 수업입니다.',
  target: '2-2',
  teacherName: '근찬띠',
  progress: 5,         // 읽은 항목 수
  maxProgress: 12,     // 전체 세부 디렉토리 수
  imageUrl: "/Paletto/Haeyul.png",
}; */

export const tabs = [
  { key: 'lesson', label: '수업' },
  { key: 'assignment', label: '과제' },
  { key: 'exam', label: '시험' }
] as const;

// 클래스룸 정보를 API에서 불러오는 함수
export const classData = async (classRoomId: string): Promise<ClassInfoProps> => {
  try {
    const res = await Customapi.get(`/classrooms/${classRoomId}`);
    return res.data;
  } catch (error) {
    console.error('클래스룸 정보를 불러오는 중 오류 발생:', error);
    throw error;
  }
};