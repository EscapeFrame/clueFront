import { useState } from 'react';
import { inquiries, InquiryItem } from '@/shared/theme/InquiryTheme';
import * as S from './styles';

export default function Inquiry() {
  const [modalContent, setModalContent] = useState<InquiryItem | null>(null);

  return (
    <>
      <S.InquiryWrapper>
        <S.TitleFont>문의사항</S.TitleFont>
        <S.InquiryList>
          {inquiries.map(({ id, title, studentId, content }) => (
            <S.InquiryItem key={id}>
              <S.InquiryTitleButton onClick={() => setModalContent({ id, title, studentId, content })}>
                {title}
              </S.InquiryTitleButton>
              <S.StudentId>{studentId}</S.StudentId>
            </S.InquiryItem>
          ))}
        </S.InquiryList>
      </S.InquiryWrapper>

      {modalContent && (
        <S.ModalOverlay onClick={() => setModalContent(null)}>
          <S.ModalContent onClick={(e) => e.stopPropagation()}>
            <S.ModalTitle>{modalContent.title}</S.ModalTitle>
            <S.ModalStudentId>{modalContent.studentId}</S.ModalStudentId>
            <S.ModalDescription>{modalContent.content}</S.ModalDescription>
            <S.CloseButton onClick={() => setModalContent(null)}>닫기</S.CloseButton>
          </S.ModalContent>
        </S.ModalOverlay>
      )}
    </>
  );
}