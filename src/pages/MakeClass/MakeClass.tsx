import { useState } from 'react';
import BasicInfo from '@/features/MakeClassComponent/BasicInfo/BasicInfo';
import ClassroomSetup from '@/features/MakeClassComponent/ClassroomSetup/ClassroomSetup';
import * as S from './styles';

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
    <S.Container>
      <BasicInfo data={basicInfo} setData={setBasicInfo} />
      <hr />
      <ClassroomSetup data={classroomSetup} setData={setClassroomSetup} />
      <S.PostButton onClick={handleSubmit}>저장하기</S.PostButton>
    </S.Container>
  );
}