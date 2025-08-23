import * as s from './styles';
import { useState } from 'react';
import { Modal } from '@/entities/UI/Modal/index';
import Customapi from '@/shared/config/api';

export default function MyClass() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classCode, setClassCode] = useState(''); // input 값 상태
  const [loading, setLoading] = useState(false);

  // 학습실 코드로 참여
  const joinClassroom = async (inputCode: string) => {
    if (!inputCode.trim()) return;
    setLoading(true);
    try {
      const response = await Customapi.get(`/classrooms/join/${inputCode}`);
      console.log('참여 가능한 학습실 정보: ', response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error('학습실 조회 실패: ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <s.Container>
      <s.Flexible>
        <s.TitleFont>나의 학습실</s.TitleFont>
        <s.AddButton onClick={() => setIsModalOpen(true)}>학습실 추가</s.AddButton>
      </s.Flexible>

      {isModalOpen && (
        <Modal
          title="학습실 추가"
          notes="input"
          placeholder="학습실 코드를 입력해주세요"
          onClose={() => setIsModalOpen(false)}
          buttons={[
            {
              text: '취소',
              type: 1,
              width: '50%',
              onClick: () => setIsModalOpen(false),
            },
            {
              text: loading ? '조회 중...' : '완료',
              type: 0,
              width: '50%',
              onClick: () => joinClassroom(classCode),
            },
          ]}
        />

      )}
    </s.Container>
  );
}