import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as s from './styles';

import Button from '@/entities/UI/Button';
import BasicInfo from '@/entities/Class/BasicInfo';
import ClassroomSetup from '@/entities/Class/ClassroomSetup';
import { BasicInfoData, ClassroomSetupData } from '@/shared/types/class/classroom';
import { createClass } from '@/features/Teacher/MakeClass/api';

export default function MakeClass() {
  const navigate = useNavigate();

  const [basicInfo, setBasicInfo] = useState<BasicInfoData>({
    subjectCategory: '',
    period: '',
    grade: '',
    classNum: '',
    roomName: '',
    description: '',
  });

  const [classroomSetup, setClassroomSetup] = useState<ClassroomSetupData>({
    isActivated: true,
    isChatEnabled: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const payload = {
        description: basicInfo.description,
        isActivation: classroomSetup.isActivated,
        name: basicInfo.roomName,
        sort: basicInfo.subjectCategory,
        target: `${basicInfo.grade}-${basicInfo.classNum}`,
      };

      await createClass(payload);
      navigate('/class');
    } catch (err: any) {
      setError('학습실 생성 실패');
      console.error(err);
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