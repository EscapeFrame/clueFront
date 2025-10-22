import { useState } from 'react';
import { MyClassData } from '@/pages/Teacher/MyClass/data';

export const useMyClass = () => {
  const [myClasses, setMyClasses] = useState<MyClassData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  // 모달에서 학습실 코드로 참여하는 함수
  const addClassroom = async (code: string) => {
    try {
      // 여기서 실제 API 호출 가능
      const newClass: MyClassData = {
          classRoomId: Date.now().toString(),
          name: `새 학습실 (${code})`,
          categoryKey: 'sort',
          assignedClass: 'A반',
          description: '모달로 추가된 학습실입니다.',
          sort: ''
      };
      setMyClasses((prev) => [...prev, newClass]);
      return true;
    } catch (err) {
      setError('학습실 추가에 실패했습니다.');
      return false;
    }
  };

  return { myClasses, error, setCategoryFilter, addClassroom };
};