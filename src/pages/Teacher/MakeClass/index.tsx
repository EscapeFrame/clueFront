import { useState } from 'react';
import * as s from './styles';
import Button from '@/entities/UI/Button';
import BasicInfo from '@/entities/Class/BasicInfo/index';
import ClassroomSetup from '@/entities/Class/ClassroomSetup/index';

export default function MakeClass() {
  // 기본정보 상태
  const [basicInfo, setBasicInfo] = useState({
    subjectCategory: '',
    period: '',
    grade: '',
    classNum: '',
    roomName: '',
    description: '',
  });

  // 학습실 설정 상태
  const [classroomSetup, setClassroomSetup] = useState({
    isActivated: true,
    isChatEnabled: true,
  });

  const handleSubmit = async () => {
    const dataToSend = {
      ...basicInfo,
      ...classroomSetup,
    };

    try {
      const res = await fetch('/api/class', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      if (!res.ok) throw new Error('서버 에러');
      alert('저장 성공!');
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert('저장 실패: ' + error.message);
      } else {
        alert('저장 실패: 알 수 없는 에러');
      }
    }
  };

  return (
    <s.Container>
      <BasicInfo data={basicInfo} setData={setBasicInfo} />
      <hr />
      <ClassroomSetup data={classroomSetup} setData={setClassroomSetup} />
      <Button text="수업 만들기" width={"100%"} type={0} onClick={handleSubmit} />
    </s.Container>
  );
}