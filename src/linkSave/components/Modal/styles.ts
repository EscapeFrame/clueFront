import styled from '@emotion/styled';
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4); /* 불투명한 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
`;

export const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 760px; /* 모달 최대 너비 확대 */
  padding: 36px; /* 내부 패딩 증가 */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const ModalTitle = styled.h2`
  font-size: 2em; /* 제목 폰트 키움 */
  font-weight: 700;
  color: #333;
  margin: 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.8em; /* 닫기 버튼 확대 */
  cursor: pointer;
  color: #999;
  transition: color 0.2s;

  &:hover {
    color: #333;
  }
`;

// === Form Elements ===

export const FormLabel = styled.label`
  display: block;
  font-size: 1em; /* 라벨 폰트 증가 */
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  
  & span {
      color: #ff4d4f; /* 필수 표시 (*) */
      margin-left: 2px;
  }
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 12px 14px; /* 입력창 패딩 증가 */
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 1.2em; /* 입력 텍스트 키움 */
  box-sizing: border-box;
  transition: border-color 0.2s;

  &:focus {
    border-color: #1890ff;
    outline: none;
  }
`;

export const FormTextarea = styled(FormInput.withComponent('textarea'))`
  resize: vertical;
  min-height: 120px; /* 텍스트영역 높이 확장 */
  margin-bottom: 24px;
`;

export const TagDescription = styled.p`
  font-size: 1em; /* 설명 텍스트 키움 */
  color: #8c8c8c;
  margin-top: -10px;
  margin-bottom: 12px;
`;

export const TagButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 30px;
`;

export const TagButton = styled.button<{ isSelected: boolean }>`
  background-color: ${props => (props.isSelected ? '#e6f7ff' : '#f5f5f5')};
  color: ${props => (props.isSelected ? '#1890ff' : '#595959')};
  border: 1px solid ${props => (props.isSelected ? '#91d5ff' : '#d9d9d9')};
  border-radius: 4px;
  padding: 8px 14px; /* 태그 버튼 패딩 증가 */
  cursor: pointer;
  font-size: 1em; /* 태그 버튼 폰트 증가 */
  transition: all 0.2s;

  &:hover {
    border-color: #1890ff;
  }
`;

// === Modal Footer (Buttons) ===

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding-top: 10px;
`;

export const CancelButton = styled.button`
  padding: 12px 22px; /* 취소 버튼 패딩 증가 */
  background-color: #ffffff;
  color: #595959;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2em; /* 취소 버튼 폰트 증가 */
  transition: all 0.2s;

  &:hover {
    border-color: #8c8c8c;
  }
`;

export const ConfirmButton = styled.button`
  padding: 12px 22px; /* 확인 버튼 패딩 증가 */
  background-color: #0077FF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2em; /* 확인 버튼 폰트 증가 */
  transition: background-color 0.2s;

  &:hover {
    background-color: #578FCA;
  }

  &:disabled {
    background-color: #D9D9D9;
    cursor: not-allowed;
  }
`;

// === Delete Modal Specific Styles ===
export const DeleteMessage = styled.div`
    font-size: 1.2em;
    font-weight: 500;
    color: #333;
    text-align: center;
    margin: 10px 0 20px;
`;

export const DeleteItemInfo = styled.div`
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 4px;
    margin-bottom: 30px;
    text-align: center;
    
    h3 {
        font-size: 1.1em;
        margin: 0 0 5px;
    }

    p {
        font-size: 0.9em;
        color: #7f7f7f;
        margin: 0;
    }
`;