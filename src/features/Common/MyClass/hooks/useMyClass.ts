import { useState, useCallback, useEffect } from 'react';
import { classApi } from '@/features/Common/MyClass/api/useMyClass';
import { ClassItem, MyClassReturn } from '@/shared/types/myClass';

export const useMyClass = (): MyClassReturn => {
  const [myClasses, setMyClasses] = useState<ClassItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ClassItem 형태로 정규화
  const normalizeClassData = (classes: any[]): ClassItem[] =>
    classes.map(c => ({
      ...c,
      name: String(c.name ?? c.classRoomName ?? '알 수 없는 학습실'),
      description: String(c.description ?? ''),
    }));

  // 전체 학습실 불러오기
  const fetchMyClasses = useCallback(async (search?: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await classApi.getClasses(search);
      if (typeof result === 'number') {
        setError(`학습실 조회 실패 (상태 코드: ${result})`);
        setMyClasses([]);
        return;
      }
      setMyClasses(normalizeClassData(result));
    } catch (err: any) {
      setError(err.response?.data?.message || '전체 학습실 불러오기 실패');
      setMyClasses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // 학습실 참여
  const joinClassroom = useCallback(async (code: string): Promise<boolean> => {
    if (!code.trim()) return false;
    setLoading(true);
    setError(null);
    try {
      const result = await classApi.joinClass(code);
      if (typeof result === 'number') {
        setError(`학습실 참여 실패 (상태 코드: ${result})`);
        return false;
      }
      const normalized = normalizeClassData([result])[0];
      setMyClasses(prev => [...prev, normalized]);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || '학습실 참여 실패');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // 학습실 생성
  const createClassroom = useCallback(
    async (name: string, description?: string): Promise<boolean> => {
      if (!name.trim()) return false;
      setLoading(true);
      setError(null);
      try {
        const result = await classApi.createClass(name, description);
        if (typeof result === 'number') {
          setError(`학습실 생성 실패 (상태 코드: ${result})`);
          return false;
        }
        const normalized = normalizeClassData([result])[0];
        setMyClasses(prev => [...prev, normalized]);
        return true;
      } catch (err: any) {
        setError(err.response?.data?.message || '학습실 생성 실패');
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // 학습실 삭제
  const deleteClassroom = useCallback(async (classId: string | number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const result = await classApi.deleteClass(classId);
      if (typeof result === 'number') {
        setError(`학습실 삭제 실패 (상태 코드: ${result})`);
        return false;
      }
      setMyClasses(prev => prev.filter(c => c.id !== classId));
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || '학습실 삭제 실패');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // 학습실 검색
  const searchClasses = useCallback(
    async (query: string) => {
      await fetchMyClasses(query);
    },
    [fetchMyClasses]
  );

  useEffect(() => {
    fetchMyClasses();
  }, [fetchMyClasses]);

  return { 
    myClasses, 
    loading, 
    error, 
    joinClassroom, 
    createClassroom, 
    deleteClassroom, 
    searchClasses, 
    refetch: fetchMyClasses 
  };
};