import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as s from './styles';

import Button from '@/entities/UI/Button';
import BasicInfo from '@/entities/Class/BasicInfo/index';
import ClassroomSetup from '@/entities/Class/ClassroomSetup/index';
import Customapi from '@/shared/config/api';

export default function MakeClass() {
  const navigate = useNavigate();

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

  // 상태 메시지
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const dataToSend = { ...basicInfo, isActivated: classroomSetup.isActivated };
    setLoading(true);

    try {
      const res = await Customapi.post('/api/class', dataToSend);
      if (res.status !== 200) {
        console.error(`서버 에러: 상태 코드 ${res.status}`);
        setError(true);
        return;
      }

      navigate('/class'); // 성공 시 MyClass 페이지로 이동
    } catch (err) {
      console.error('학습실 생성 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <s.Container>
      <BasicInfo data={basicInfo} setData={setBasicInfo} />
      <hr />
      <ClassroomSetup data={classroomSetup} setData={setClassroomSetup} />
      {error && <s.ErrorMessage>{error}</s.ErrorMessage>}
      <Button
        text={loading ? '생성 중...' : '수업 만들기'}
        width="100%"
        type={0}
        onClick={handleSubmit}
      />
    </s.Container>
  );
}