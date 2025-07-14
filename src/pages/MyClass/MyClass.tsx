import { ClassList, } from "@/features/ClassComponent/MyClass/ClassList";
import * as S from './styles';
import { Modal } from "@/features/ClassComponent/MyClass/Modal/Modal";
import { useState } from 'react';
import axios from 'axios';

export default function MyClass() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classCode, setClassCode] = useState('');

  const handleAddClass = async () => {
    try {
      // 백엔드 API 호출
      const response = await axios.post('/api/classes/add', {
        classCode
      });

      console.log('학습실 추가 성공', response.data);
      setIsModalOpen(false);
      setClassCode(''); // 입력 필드 초기화
      // 필요시 페이지 새로고침 또는 상태 업데이트
    } catch (error) {
      console.error('학습실 추가 중 오류:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClassCode(e.target.value);
  };

  return (
    <S.Body>
      <S.Flexible>
        <S.TitleFont>나의 학습실</S.TitleFont>
        <S.AddButton onClick={() => setIsModalOpen(true)}>학습실 추가</S.AddButton>
      </S.Flexible>
      <ClassList />
      
      <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="추가할 학습실 코드"
        onConfirm={handleAddClass}
        confirmText="확인"
      >
        <S.ModalInput 
          placeholder="수업코드를 입력해 주세요."
          value={classCode}
          onChange={handleInputChange}
        />
      </Modal>
    </S.Body>
  );
}