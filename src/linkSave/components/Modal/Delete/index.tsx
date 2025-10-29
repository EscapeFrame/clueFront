// src/linkSave/components/DeleteConfirmModal.tsx

import React from 'react';
import * as S from '../styles';
import { LinkCard } from '@/linkSave/types/card';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardToDelete: LinkCard | null; // 삭제할 카드의 정보
  onConfirm: (cardId: string) => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ 
  isOpen, 
  onClose, 
  cardToDelete, 
  onConfirm 
}) => {

  if (!isOpen || !cardToDelete) return null;

  const handleConfirm = () => {
    onConfirm(cardToDelete.id);
    onClose();
  };

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={e => e.stopPropagation()}>
        <S.ModalHeader>
          <S.ModalTitle>내용을 삭제하시겠습니까?</S.ModalTitle>
          <S.CloseButton onClick={onClose}>&times;</S.CloseButton>
        </S.ModalHeader>

        <S.DeleteItemInfo>
            <h3>{cardToDelete.title}</h3>
            <p>{cardToDelete.description}</p>
        </S.DeleteItemInfo>

        <S.ModalFooter>
          <S.CancelButton onClick={onClose}>취소</S.CancelButton>
          <S.ConfirmButton onClick={handleConfirm}>확인</S.ConfirmButton>
        </S.ModalFooter>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default DeleteConfirmModal;