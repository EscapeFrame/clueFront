import React from 'react';
import * as s from './styles';

interface AddModalProps {
  title: string;
  onClose: () => void;
  onAdd: () => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export default function AddModal({
  title,
  onClose,
  onAdd,
  value,
  onChange,
  placeholder,
}: AddModalProps) {
  return (
    <s.ModalOverlay onClick={onClose}>
      <s.ModalWrapper onClick={(e) => e.stopPropagation()}>
        <s.Header>
          <s.Title>{title}</s.Title>
          <s.CloseButton onClick={onClose}>&times;</s.CloseButton>
        </s.Header>
        
        <s.InputField
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        
        <s.ButtonContainer>
          <s.Button onClick={onClose}>취소</s.Button>
          <s.Button primary onClick={onAdd}>확인</s.Button>
        </s.ButtonContainer>
      </s.ModalWrapper>
    </s.ModalOverlay>
  );
}
