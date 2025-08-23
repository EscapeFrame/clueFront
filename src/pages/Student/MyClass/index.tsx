import * as s from './styles';
import { useState } from 'react';
import { Modal } from '@/entities/UI/Modal/index';
import Customapi from '@/shared/config/api';

export default function MyClass() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classCode, setClassCode] = useState(''); // input 값 상태
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // 오류 메시지
  const [myClasses, setMyClasses] = useState<any[]>([]); // 내 학습실 목록

  // 학습실 코드로 참여
  const joinClassroom = async (code: string) => {
    if (!code.trim()) return;
    setLoading(true);
    setError('');
    try {
      const response = await Customapi.get(`/api/class/${code}/members`);
      console.log('참여 가능한 학습실 정보: ', response.data);

      // 참여 성공 시 내 학습실 목록에 추가
      setMyClasses(prev => [...prev, response.data]);

      setIsModalOpen(false);
      setClassCode('');
    } catch (err: any) {
      console.error('학습실 조회 실패: ', err);
      setError(err.response?.data?.message || '학습실 참여 실패');
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

      {error && <s.ErrorMessage>{error}</s.ErrorMessage>}

      {/* 학습실 목록 출력 */}
      {myClasses.map((cls, idx) => (
        <div key={idx}>{cls.name || '알 수 없는 학습실'}</div>
      ))}

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
              onClick: () => joinClassroom(classCode) // 외부 state 사용해 값 그대로 가져오기
            },
          ]}
        />

      )}
    </s.Container>
  );
}