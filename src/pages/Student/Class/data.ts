import { ClassInfoProps } from '@/shared/types/classroom';
import Customapi from '@/shared/config/api';

export const tabs = [
  { key: 'lesson', label: '수업' },
  { key: 'assignment', label: '과제' },
  { key: 'exam', label: '시험' }
] as const;

// 클래스룸 정보를 API에서 불러오는 함수
export const classData = async (classId: string): Promise<ClassInfoProps> => {
  try {
    const res = await Customapi.get(`/api/class/${classId}`);
    // imageUrl을 고정
    return {
      ...res.data,
      imageUrl: '/Paletto/Haeyul.png',
    };
  } catch (error) {
    console.error('클래스룸 정보를 불러오는 중 오류 발생:', error);
    throw error;
  }
};