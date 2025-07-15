import React, { useState } from 'react';
import {
  TitleFont, NoticeWrapper, NoticeList,
  NoticeItem, NoticeTitleButton, NoticeDate,
  ModalOverlay, ModalContent, ModalTitle,
  ModalDate, ModalDescription, CloseButton,
} from '@/features/ClassComponent/Lesson/Notice/styles';
import { Notices } from '@/shared/theme/NoticeTheme';

export default function Notice() {
  const [selectedNotice, setSelectedNotice] = useState<null | typeof Notices[0]>(null);

  const openModal = (notice: typeof Notices[0]) => {
    setSelectedNotice(notice);
  };

  const closeModal = () => {
    setSelectedNotice(null);
  };

  return (
    <NoticeWrapper>
      <TitleFont>새소식</TitleFont>
      <NoticeList>
        {Notices.map(notice => (
          <NoticeItem key={notice.id}>
            <NoticeTitleButton type="button" onClick={() => openModal(notice)}>
              {notice.title}
            </NoticeTitleButton>
            <NoticeDate>{notice.date}</NoticeDate>
          </NoticeItem>
        ))}
      </NoticeList>

      {selectedNotice && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <ModalTitle>{selectedNotice.title}</ModalTitle>
            <ModalDate>{selectedNotice.date}</ModalDate>
            <ModalDescription>{selectedNotice.description}</ModalDescription>
            <CloseButton onClick={closeModal}>닫기</CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </NoticeWrapper>
  );
}