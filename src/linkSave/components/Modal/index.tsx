import React, { useState, useEffect } from 'react';
import * as S from './styles';
import { LinkCard, LinkFormData } from '@/linkSave/types/card';
import { FormInputGroup } from './Input';

interface LinkFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalTitle: string; // "링크 추가" 또는 "링크 수정"
  initialData?: LinkCard; // 수정 모드일 때 전달될 기존 데이터
  onSubmit: (data: LinkFormData, cardId?: string) => void;
}

const ALL_TAGS = ['반', '인문과목', '전공과목', '방과후', '기타']; // 태그 목록

const LinkFormModal: React.FC<LinkFormModalProps> = ({
  isOpen,
  onClose,
  modalTitle,
  initialData,
  onSubmit
}) => {
  const [formData, setFormData] = useState<LinkFormData>({
    title: '',
    url: '',
    explanation: '',
    tags: [],
  });

  // 수정 모드 진입 시, initialData로 폼 데이터 초기화
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        url: initialData.url,
        explanation: initialData.explanation,
        tags: initialData.tags,
      });
    } else {
      // 추가 모드일 때는 폼 초기화
      setFormData({
        title: '',
        url: '',
        explanation: '',
        tags: [],
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagToggle = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 유효성 검사 (예: 필수 필드)
    if (!formData.title || !formData.url || formData.tags.length === 0) {
      alert('필수 입력 항목(*)을 모두 채워주세요.');
      return;
    }

    // onSubmit 함수를 통해 부모 컴포넌트에 데이터 전달 (API 호출 담당)
    onSubmit(formData, initialData?.id);
    onClose(); // 제출 후 모달 닫기
  };

  const isConfirmDisabled = !formData.title || !formData.url || formData.tags.length === 0;

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={e => e.stopPropagation()}>
        <S.ModalHeader>
          <S.ModalTitle>{modalTitle}</S.ModalTitle>
          <S.CloseButton onClick={onClose}>&times;</S.CloseButton>
        </S.ModalHeader>

        <form onSubmit={handleSubmit}>
          <FormInputGroup
            label="제목"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="제목을 입력해주세요."
            isRequired
          />

          <FormInputGroup
            label="URL"
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="URL을 입력해주세요."
            isRequired
          />

          <FormInputGroup
            label="설명"
            name="explanation"
            value={formData.explanation}
            onChange={handleChange}
            placeholder="URL에 대한 설명을 간단히 적어주세요."
            isTextarea
          />

          <S.FormLabel>태그 <span>*</span></S.FormLabel>
          <S.TagDescription>중복 선택이 가능하며, 1개 이상 선택해주세요.</S.TagDescription>
          <S.TagButtonContainer>
            {ALL_TAGS.map(tag => (
              <S.TagButton
                key={tag}
                type="button"
                isSelected={formData.tags.includes(tag)}
                onClick={() => handleTagToggle(tag)}
              >
                {tag}
              </S.TagButton>
            ))}
          </S.TagButtonContainer>

          <S.FormLabel>공개범위 <span>*</span></S.FormLabel>
          <S.TagDescription>중복 선택이 가능하며, 1개 이상 선택해주세요.</S.TagDescription>
          <S.TagButtonContainer>
            
          </S.TagButtonContainer>

          <S.ModalFooter>
            <S.CancelButton type="button" onClick={onClose}>취소</S.CancelButton>
            <S.ConfirmButton type="submit" disabled={isConfirmDisabled}>확인</S.ConfirmButton>
          </S.ModalFooter>
        </form>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default LinkFormModal;