import React, { useState } from 'react';
import * as s from './styles';

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: { subject: string; grade: string; class: string }) => void;
}

const GRADES = ['1', '2', '3'];
const CLASSES = ['1', '2', '3', '4'];

export default function AddModal({ isOpen, onClose, onConfirm }: AddModalProps) {
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [classNum, setClassNum] = useState('');
  const [showGradeDropdown, setShowGradeDropdown] = useState(false);
  const [showClassDropdown, setShowClassDropdown] = useState(false);

  const handleConfirm = () => {
    onConfirm({ subject, grade, class: classNum });
    setSubject('');
    setGrade('');
    setClassNum('');
    setShowGradeDropdown(false);
    setShowClassDropdown(false);
  };

  const handleCancel = () => {
    onClose();
    setSubject('');
    setGrade('');
    setClassNum('');
    setShowGradeDropdown(false);
    setShowClassDropdown(false);
  };

  const handleGradeSelect = (selectedGrade: string) => {
    setGrade(selectedGrade);
    setShowGradeDropdown(false);
  };

  const handleClassSelect = (selectedClass: string) => {
    setClassNum(selectedClass);
    setShowClassDropdown(false);
  };

  if (!isOpen) return null;

  return (
    <s.ModalOverlay onClick={handleCancel}>
      <s.ModalWrapper onClick={(e) => e.stopPropagation()}>
        <s.Header>
          <s.Title>내용 추가하기</s.Title>
          <s.CloseButton onClick={handleCancel}>&times;</s.CloseButton>
        </s.Header>
        
        <s.InputField
          type="text"
          placeholder="과목을 입력해주세요"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        
        <s.SelectContainer>
          <s.SelectField>
            <s.SelectInput onClick={() => setShowGradeDropdown(!showGradeDropdown)}>
              <s.SelectPlaceholder>
                {grade || '학년을 선택해주세요'}
              </s.SelectPlaceholder>
              <s.ChevronIcon>▼</s.ChevronIcon>
            </s.SelectInput>
            {showGradeDropdown && (
              <s.Dropdown>
                {GRADES.map((gradeOption) => (
                  <s.DropdownItem
                    key={gradeOption}
                    onClick={() => handleGradeSelect(gradeOption)}
                  >
                    {gradeOption}
                  </s.DropdownItem>
                ))}
              </s.Dropdown>
            )}
          </s.SelectField>
          
          <s.SelectField>
            <s.SelectInput onClick={() => setShowClassDropdown(!showClassDropdown)}>
              <s.SelectPlaceholder>
                {classNum || '반을 선택해주세요'}
              </s.SelectPlaceholder>
              <s.ChevronIcon>▼</s.ChevronIcon>
            </s.SelectInput>
            {showClassDropdown && (
              <s.Dropdown>
                {CLASSES.map((classOption) => (
                  <s.DropdownItem
                    key={classOption}
                    onClick={() => handleClassSelect(classOption)}
                  >
                    {classOption}
                  </s.DropdownItem>
                ))}
              </s.Dropdown>
            )}
          </s.SelectField>
        </s.SelectContainer>
        
        <s.ButtonContainer>
          <s.Button onClick={handleCancel}>취소</s.Button>
          <s.Button primary onClick={handleConfirm}>확인</s.Button>
        </s.ButtonContainer>
      </s.ModalWrapper>
    </s.ModalOverlay>
  );
}