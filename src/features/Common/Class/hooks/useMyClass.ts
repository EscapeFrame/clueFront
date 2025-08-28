import { useEffect, useState } from 'react';
import { ClassResponse } from '@/shared/types/class/class';
import * as api from '@/features/Common/Class/api/useMyClass';

export const useMyClass = () => {
  const [myClasses, setMyClasses] = useState<ClassResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadClasses = async () => {
    setLoading(true);
    try {
      const data = await api.fetchClasses();
      setMyClasses(data);
      setError('');
    } catch (err: any) {
      console.error(err);
      setError(err.message || '학습실 불러오기 실패');
    } finally {
      setLoading(false);
    }
  };

  const joinClass = async (code: string) => {
    if (!code.trim()) return;
    setLoading(true);
    try {
      const newClass = await api.joinClassroomByCode(code);
      setMyClasses(prev => [...prev, newClass]);
      setError('');
    } catch (err: any) {
      console.error(err);
      setError(err.message || '학습실 참여 실패');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClasses();
  }, []);

  return { myClasses, loading, error, joinClass };
};