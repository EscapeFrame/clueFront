import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ClassInfoProps } from '@/shared/types/Class/classroom';
import ProgressBar from '@/entities/UI/ProgressBar';
import { FaUserAlt } from "react-icons/fa";
import { getClassInfo } from '../api';
import HaeyulImg from '@/../public/Paletto/Haeyul.png';
import * as s from './styles';

export const ClassInfo: React.FC<ClassInfoProps> = ({
  name, teacherName, description, progress, maxProgress
}) => {
  const { classId } = useParams<{ classId: string }>();
  const [classData, setClassData] = useState({
    name: name || '',
    teacherName: teacherName || "선생님",
    description: description || '',
    progress: progress || 0,
    maxProgress: maxProgress || 100,
  });
  const [isLoading, setIsLoading] = useState(false);

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
      console.log("API response:", response);
      console.log("넘어온 값",response)

      if (response && typeof response === 'object') {
        setClassData({
          name: response.name || "",
          description: response.description || "",
          teacherName: response.teacherName || "",
          progress: 0,
          maxProgress: 100,
        });
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
          <span>{classData.teacherName}님</span>
        </s.TeacherRow>

        <ProgressBar progress={classData.progress} maxProgress={classData.maxProgress} />
      </s.LeftSection>
      <s.Img imageUrl={HaeyulImg} />
    </s.Container>
  );
}; 