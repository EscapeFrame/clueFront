import { useState, useEffect } from 'react';
import { Directory, NewsItem, QuestionItem, LessonProps } from '@/shared/types/class/lesson';
import * as api from '../api/useLesson';

export const useLesson = ({ classRoomId }: LessonProps) => {
  const [directories, setDirectories] = useState<Directory[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const [dirs, newsData, questionsData] = await Promise.all([
        api.fetchDirectories(classRoomId),
        api.fetchNews(),
        api.fetchQuestions(),
      ]);

      setDirectories(dirs);
      setNews(newsData);
      setQuestions(questionsData);
      setError('');
    } catch (err: any) {
      console.error(err);
      setError(err.message || '데이터 로드 실패');
    } finally {
      setLoading(false);
    }
  };

  const createDirectory = async (name: string, order: number) => {
    try {
      const newDir = await api.createDirectory({ classRoomId: Number(classRoomId), name, directoryOrder: order });
      setDirectories(prev => [...prev, newDir]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || '디렉토리 생성 실패');
    }
  };

  const updateDirectory = async (directoryId: number, changes: Partial<Directory>) => {
    try {
      const updated = await api.updateDirectory(directoryId, changes);
      setDirectories(prev => prev.map(d => (d.directoryOrder === directoryId ? updated : d)));
    } catch (err: any) {
      console.error(err);
      setError(err.message || '디렉토리 수정 실패');
    }
  };

  useEffect(() => {
    if (classRoomId) loadData();
  }, [classRoomId]);

  return {
    directories,
    news,
    questions,
    loading,
    error,
    createDirectory,
    updateDirectory,
  };
};