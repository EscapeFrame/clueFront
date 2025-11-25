import { useState } from 'react';
import { Modal } from '@/entities/UI/Modal';
import { useModal } from '@/entities/UI/Modal/modal.hooks';
import styled from '@emotion/styled';

export default function ModalTest() {
  const { isOpen, openModal, closeModal } = useModal();
  const [inputValue, setInputValue] = useState('');

  return (
    <Container>
      <Title>모달 테스트 페이지</Title>
      <Description>
        아래 버튼을 클릭하면 모달이 표시됩니다. <br />
        우측 상단의 빨간색 X 버튼을 확인해보세요!
      </Description>

      <ButtonGroup>
        <TestButton onClick={openModal}>
          모달 열기
        </TestButton>
      </ButtonGroup>

      {isOpen && (
        <Modal
          title="모달 테스트"
          onClose={closeModal}
          buttons={[
            { text: '취소', type: 2, width: '50%', onClick: closeModal },
            { text: '확인', type: 0, width: '50%', onClick: () => {
              alert(`입력값: ${inputValue}`);
              closeModal();
            }},
          ]}
        >
          <ModalContent>
            <Label>테스트 입력:</Label>
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="여기에 입력하세요"
            />
            <InfoText>
              ✨ 우측 상단의 X 버튼이 디렉토리 삭제 아이콘과 동일한 스타일로 표시됩니다.
            </InfoText>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
}

const Container = styled.div`
  padding: 4rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const TestButton = styled.button`
  padding: 1rem 2rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #1d4ed8;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const InfoText = styled.p`
  font-size: 0.85rem;
  color: #6b7280;
  background: #f3f4f6;
  padding: 0.75rem;
  border-radius: 6px;
  margin-top: 0.5rem;
`;
