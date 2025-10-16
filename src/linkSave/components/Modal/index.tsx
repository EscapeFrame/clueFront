import React, { useState, useEffect } from 'react';
import * as S from './styles';
import { LinkCard, LinkFormData, LINK_CATEGORY_MAP } from '@/linkSave/types/card';
import { FormInputGroup } from './Input';
import ToggleSwitch from '../UI/ToggleSwitch';


interface LinkFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalTitle: string; // "링크 추가" 또는 "링크 수정"
  initialData?: LinkCard; // 수정 모드일 때 전달될 기존 데이터
  onSubmit: (data: LinkFormData, cardId?: string) => void;
}

const ALL_TAGS = Object.values(LINK_CATEGORY_MAP).filter(v => v !== '전체');

const LinkFormModal: React.FC<LinkFormModalProps> = ({
  isOpen,
  onClose,
  modalTitle,
  initialData,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<LinkFormData>({
    title: '',
    url: '',
    explanation: '',
    subjectType: [],
  });

  // 공개 범위 상태
  const [visibility, setVisibility] = useState({
    grade: false,
    class: false,
  });

  // 수정 모드 진입 시 데이터 초기화
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        url: initialData.link,
        explanation: initialData.description,
        subjectType: initialData.subjectType,
      });
    } else {
      setFormData({
        title: '',
        url: '',
        explanation: '',
        subjectType: [],
      });
      setVisibility({ grade: false, class: false });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  // 인풋 변경
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 태그 토글
  const handleTagToggle = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      subjectType: prev.subjectType.includes(tag)
        ? prev.subjectType.filter(t => t !== tag)
        : [...prev.subjectType, tag],
    }));
  };

  // 공개범위 토글
  const handleVisibilityToggle = (key: 'grade' | 'class', checked: boolean) => {
    setVisibility(prev => ({ ...prev, [key]: checked }));
  };

  // 제출
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.url || formData.subjectType.length === 0) {
      alert('필수 입력 항목(*)을 모두 채워주세요.');
      return;
    }

    // 제출 시 onSubmit 콜백으로 전달
    const submitData = {
      ...formData,
      visibility,
    };

    onSubmit(submitData, initialData?.id);
    onClose();
  };

  const isConfirmDisabled =
    !formData.title || !formData.url || formData.subjectType.length === 0;

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={e => e.stopPropagation()}>
        <S.ModalHeader>
          <S.ModalTitle>{modalTitle}</S.ModalTitle>
          <S.CloseButton onClick={onClose}>&times;</S.CloseButton>
        </S.ModalHeader>

        <form onSubmit={handleSubmit}>
          {/* 제목 */}
          <FormInputGroup
            label="제목"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="제목을 입력해주세요."
            isRequired
          />

          {/* URL */}
          <FormInputGroup
            label="URL"
            type="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="URL을 입력해주세요."
            isRequired
          />

          {/* 설명 */}
          <FormInputGroup
            label="설명"
            type="text"
            name="explanation"
            value={formData.explanation}
            onChange={handleChange}
            placeholder="URL에 대한 설명을 간단히 적어주세요."
            isTextarea
          />

          {/* 태그 */}
          <S.FormLabel>
            태그 <span>*</span>
          </S.FormLabel>
          <S.TagDescription>
            중복 선택이 가능하며, 1개 이상 선택해주세요.
          </S.TagDescription>
          <S.TagButtonContainer>
            {ALL_TAGS.map(tag => (
              <S.TagButton
                key={tag}
                type="button"
                isSelected={formData.subjectType.includes(tag)}
                onClick={() => handleTagToggle(tag)}
              >
                {tag}
              </S.TagButton>
            ))}
          </S.TagButtonContainer>

          {/* 공개범위 */}
          <S.FormLabel>
            공개범위 <span>*</span>
          </S.FormLabel>
          <S.TagDescription>원하는 범위를 선택해주세요.</S.TagDescription>
          <S.TagButtonContainer>
            학년
            <ToggleSwitch
              id="gradeToggle"
              checked={visibility.grade}
              onChange={checked => handleVisibilityToggle('grade', checked)}
            />
            반
            <ToggleSwitch
              id="classToggle"
              checked={visibility.class}
              onChange={checked => handleVisibilityToggle('class', checked)}
            />
          </S.TagButtonContainer>

          {/* 버튼 */}
          <S.ModalFooter>
            <S.CancelButton type="button" onClick={onClose}>
              취소
            </S.CancelButton>
            <S.ConfirmButton type="submit" disabled={isConfirmDisabled}>
              확인
            </S.ConfirmButton>
          </S.ModalFooter>
        </form>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default LinkFormModal;
