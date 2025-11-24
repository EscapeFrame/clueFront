import React, { useState, useEffect } from 'react';
import * as S from './styles';
import { LinkCard, LinkFormData, LINK_CATEGORY_MAP, LINK_CATEGORY_ENGLISH_MAP, AuthorizationType } from '@/linkSave/types/card';
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
  console.log('LinkFormModal rendered, isOpen:', isOpen);
  const [formData, setFormData] = useState<LinkFormData>({
    title: '',
    link: '',
    description: '',
    subjectType: '',
  });

  // 공개 범위 상태
  const [visibility, setVisibility] = useState({
    grade: false,
    class: false,
  });

  // 수정 모드 진입 시 데이터 초기화
  useEffect(() => {
    if (initialData) {
      const initLink = initialData.link ?? '';
      const initDescription = initialData.description ?? '';
      console.debug('LinkFormModal initialData loaded:', { id: initialData.id, link: initLink, description: initDescription });
      const rawSubject = Array.isArray(initialData.subjectType)
        ? String(initialData.subjectType[0] || '')
        : String(initialData.subjectType ?? '');

      const koreanTag = Object.keys(LINK_CATEGORY_ENGLISH_MAP).find(k => {
        const key = k as unknown as keyof typeof LINK_CATEGORY_ENGLISH_MAP;
        const eng = LINK_CATEGORY_ENGLISH_MAP[key];
        return eng === rawSubject;
      }) as string | undefined;

      setFormData({
        title: String(initialData.title ?? ''),
        link: String(initLink),
        description: String(initDescription),
        subjectType: koreanTag ?? rawSubject,
      });

      // authorizationType에 따라 visibility 초기화
      const auth = String(initialData.authorizationType ?? '').toUpperCase();
      if (auth === 'PUBLIC') {
        setVisibility({ grade: true, class: false });
      } else if (auth === 'CLASS_ONLY') {
        setVisibility({ grade: false, class: true });
      } else {
        setVisibility({ grade: false, class: false });
      }
    } else {
      setFormData({
        title: '',
        link: '',
        description: '',
        subjectType: '',
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
      subjectType: prev.subjectType === tag ? '' : tag,
    }));
  };

  // 공개범위 토글
  const handleVisibilityToggle = (key: 'grade' | 'class', checked: boolean) => {
    if (checked) {
      if (key === 'grade') {
        setVisibility({ grade: true, class: false });
      } else {
        // key === 'class'
        setVisibility({ grade: false, class: true });
      }
    } else {
      // When unchecking, just set that specific key to false.
      setVisibility(prev => ({ ...prev, [key]: false }));
    }
  };

  // 제출
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.link || formData.subjectType.length === 0) {
      alert('필수 입력 항목(*)을 모두 채워주세요.');
      return;
    }

    let visibilityScope: AuthorizationType = 'PRIVATE';
    if (visibility.grade) {
      visibilityScope = 'PUBLIC';
    } else if (visibility.class) {
      visibilityScope = 'CLASS_ONLY';
    }

    // 제출 시 onSubmit 콜백으로 전달
    const submitData = {
      ...formData,
      authorizationType: visibilityScope,
    };

  onSubmit(submitData, initialData?.id ? String(initialData.id) : undefined);
    onClose();
  };

  const isConfirmDisabled =
    !formData.title || !formData.link || formData.subjectType.length === 0;

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
            name="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="URL을 입력해주세요."
            isRequired
          />

          {/* 설명 */}
          <FormInputGroup
            label="설명"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="URL에 대한 설명을 간단히 적어주세요."
            isTextarea
          />

          {/* 태그 */}
          <S.FormLabel>
            태그 <span>*</span>
          </S.FormLabel>
          <S.TagDescription>
            해당 수업을 선택해주세요.
          </S.TagDescription>
          <S.TagButtonContainer>
            {ALL_TAGS.map(tag => (
              <S.TagButton
                key={tag}
                type="button"
                isSelected={formData.subjectType === tag}
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
