import { useState } from 'react';
import { Notices } from '@/shared/theme/NoticeTheme';
import * as S from './styles';

export default function Notice() {
  const [selectedNotice, setSelectedNotice] = useState<null | typeof Notices[0]>(null);

  const openModal = (notice: typeof Notices[0]) => {
    setSelectedNotice(notice);
  };

  const closeModal = () => {
    setSelectedNotice(null);
  };

  return (
    <S.NoticeWrapper>
      <S.TitleFont>새소식</S.TitleFont>
      <S.NoticeList>
        {Notices.map((notice) => (
          <S.NoticeItem key={notice.id}>
            <S.NoticeTitleButton type="button" onClick={() => openModal(notice)}>
              {notice.title}
            </S.NoticeTitleButton>
            <S.NoticeDate>{notice.date}</S.NoticeDate>
          </S.NoticeItem>
        ))}
      </S.NoticeList>

      {selectedNotice && (
        <S.ModalOverlay onClick={closeModal}>
          <S.ModalContent onClick={e => e.stopPropagation()}>
            <S.ModalTitle>{selectedNotice.title}</S.ModalTitle>
            <S.ModalDate>{selectedNotice.date}</S.ModalDate>
            <S.ModalDescription>{selectedNotice.description}</S.ModalDescription>
            <S.CloseButton onClick={closeModal}>닫기</S.CloseButton>
          </S.ModalContent>
        </S.ModalOverlay>
      )}
    </S.NoticeWrapper>
  );
}