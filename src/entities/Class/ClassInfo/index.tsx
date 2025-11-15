import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ClassInfoProps } from '@/shared/types/Class/classroom';
import { FaUserAlt } from "react-icons/fa";
import { getClassInfo } from '../api';
import * as s from './styles';

interface ClassDataState {
  name: string;
  teacherNames: string[];
  description: string;
}

export const ClassInfo: React.FC<Partial<ClassInfoProps>> = ({
  name, teacherNames, description,
}) => {
  console.log("ClassInfo props:", { name, teacherNames, description });
  const { classId } = useParams<{ classId: string }>();
  const [classData, setClassData] = useState<ClassDataState>({
    name: name || '',
    teacherNames: teacherNames || [],
    description: description || '',
  });
  console.log("Initial classData state:", classData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("useEffect triggered with classId:", classId);
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

      if (response && typeof response === 'object') {
        setClassData({
          name: response.name || "",
          description: response.description || "",
          teacherNames: response.teacherNames || [],
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
        <s.Title>{classData.name}</s.Title>
        <s.TeacherRow>
          <FaUserAlt />
          <span>{classData.teacherNames.length > 0 ? classData.teacherNames.join(', ') : " "}선생님</span>
        </s.TeacherRow>
        <s.Description>{classData.description}</s.Description>
    </s.Container>
  );
}; 