import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ClassInfoProps } from '@/shared/types/class/class';
import ProgressBar from '@/entities/UI/ProgressBar';
import { FaUserAlt } from "react-icons/fa";
import { getClassInfo } from '../api';
import * as s from './styles';

export const ClassInfo: React.FC<ClassInfoProps> = ({
  name, teacherName, description, progress, maxProgress, imageUrl
}) => {
  const { classId } = useParams<{ classId: string }>();
  const [classData, setClassData] = useState({
    name: name || '',
    teacherName: teacherName || '',
    description: description || '',
    progress: progress || 0,
    maxProgress: maxProgress || 100,
    imageUrl: imageUrl || ''
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (classId) {
      loadClassInfo();
    }
  }, [classId]);

  const loadClassInfo = async () => {
    if (!classId) return;
    
    try {
      setIsLoading(true);
      
      const response = await getClassInfo(classId);
      
      if (response && typeof response === 'object') {
        setClassData(response);
      } else {
        console.warn('클래스 정보 조회 실패:', response);
      }
    } catch (error) {
      console.error('클래스 정보 조회 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <s.Container>
        {/* 나중에 loading style로 변경 */}
        <div> 
          클래스 정보를 불러오는 중...
        </div>
      </s.Container>
    );
  }

  return (
    <s.Container>
      <s.LeftSection>
        <s.Title>{classData.name}</s.Title>
        <s.Description>{classData.description}</s.Description>

        <s.TeacherRow>
          <FaUserAlt />
          <span>{classData.teacherName}</span>
        </s.TeacherRow>

        <ProgressBar progress={classData.progress} maxProgress={classData.maxProgress} />
      </s.LeftSection>
      {classData.imageUrl && <s.Img imageUrl={classData.imageUrl} />}
    </s.Container>
  );
}; 