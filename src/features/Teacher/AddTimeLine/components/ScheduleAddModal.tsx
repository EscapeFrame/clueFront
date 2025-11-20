import React, { useState } from 'react';
import * as s from '@/entities/UI/AddModal/styles'; // Reusing styles from AddModal
import Button from '@/entities/UI/Button'; // Assuming Button is generic

interface ScheduleAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: { subject: string; grade: string; class: string; }) => void;
}

export default function ScheduleAddModal({
  isOpen,
  onClose,
  onConfirm,
}: ScheduleAddModalProps) {
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [classNum, setClassNum] = useState('');

  const handleConfirmClick = () => {
    onConfirm({ subject, grade, class: classNum });
    setSubject('');
    setGrade('');
    setClassNum('');
  };

  if (!isOpen) return null;

  return (
    <s.ModalOverlay onClick={onClose}>
      <s.ModalWrapper onClick={(e) => e.stopPropagation()}>
        <s.Header>
          <s.Title>시간표 추가</s.Title>
          <s.CloseButton onClick={onClose}>&times;</s.CloseButton>
        </s.Header>
        
        <s.InputField
          type="text"
          placeholder="과목"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <s.InputField
          type="text"
          placeholder="학년"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
        <s.InputField
          type="text"
          placeholder="반"
          value={classNum}
          onChange={(e) => setClassNum(e.target.value)}
        />
        
        <s.ButtonContainer>
          <Button text="취소" onClick={onClose} />
          <Button text="확인" type={0} onClick={handleConfirmClick} />
        </s.ButtonContainer>
      </s.ModalWrapper>
    </s.ModalOverlay>
  );
}
