import * as s from './styles';
import { useState } from 'react';
import { Modal } from '@/entities/UI/Modal/index';

export default function MyClass() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classCode, setClassCode] = useState('');

  return (
    <s.Container>
      <s.Flexible>
        <s.TitleFont>나의 학습실</s.TitleFont>
        <s.AddButton onClick={() => setIsModalOpen(true)}>학습실 추가</s.AddButton>
      </s.Flexible>

      {isModalOpen && (
        <Modal
          title="학습실추가"
          notes="input"
          placeholder="학습실 코드를 입력해주세요"
          onClose={() => setIsModalOpen(false)}
          buttons={[
            { text: '취소', type: 1, width: '50%', onClick: () => setIsModalOpen(false) },
            { text: '완료', type: 0, width: '50%', onClick: () => {
              setIsModalOpen(false);
              console.log('입력된 수업코드:', classCode);
              // 여기서 classCode 활용해서 API 호출하거나 처리 가능
            }},
          ]}
        >
        </Modal>
      )}
    </s.Container>
  );
}