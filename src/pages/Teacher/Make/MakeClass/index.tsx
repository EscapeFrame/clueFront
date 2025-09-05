import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as s from './styles';
import { BasicInfoData } from '@/shared/types/Class/classroom';
import Button from '@/entities/UI/Button';
import BasicInfo from '@/entities/Class/BasicInfo/index';
import ClassroomSetup from '@/entities/Class/ClassroomSetup/index';
import { classApi } from '@/features/Common/MyClass/api/useMyClass';

export default function MakeClass() {
  const navigate = useNavigate();

  // 기본정보 상태
  const [basicInfo, setBasicInfo] = useState<BasicInfoData>({
    subjectCategory: '',
    period: '',
    grade: '',
    classNum: '',
    roomName: '',
    description: '',
  });

  // 토글 상태
  const [isActivation, setIsActivation] = useState(true);
  const [isChatEnabled, setIsChatEnabled] = useState(true);

  // 상태 메시지
  const [error] = useState('');
  const [loading, setLoading] = useState(false);

  const handleToggle = (name: string, checked: boolean) => {
    if (name === 'isActivation') setIsActivation(checked);
    if (name === 'isChatEnabled') setIsChatEnabled(checked);
    console.log('토글 변경:', { name, checked, isActivation: name === 'isActivation' ? checked : isActivation, isChatEnabled: name === 'isChatEnabled' ? checked : isChatEnabled });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const dataToSend = {
      name: basicInfo.roomName,
      description: basicInfo.description,
      sort: basicInfo.subjectCategory,
      target: `${basicInfo.grade}-${basicInfo.classNum}`,
      isActivation: isActivation,
    };

    console.log('제출 값:', { basicInfo, isActivation, isChatEnabled, dataToSend });

    try {
      const res = await classApi.createClass('/api/class', dataToSend);
      if (res.status !== 200) {
        console.error(`서버 에러: 상태 코드 ${res.status}`);
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
      <BasicInfo
        data={basicInfo}
        setData={setBasicInfo}
      />
      <hr />
      <ClassroomSetup
        isActivation={isActivation}
        isChatEnabled={isChatEnabled}
        handleToggle={handleToggle}
      />
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