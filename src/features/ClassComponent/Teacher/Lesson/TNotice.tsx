import React, { useState } from 'react';
import styles from '@/shared/css/Class/Lesson/Notice.module.css';
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
    <div className={styles.noticeWrapper}>
      <div className={styles.TitleFont}>새소식</div>
      <ul className={styles.noticeList}>
        {Notices.map((notice) => (
          <li key={notice.id} className={styles.noticeItem}>
            <button
              type="button"
              onClick={() => openModal(notice)}
              className={styles.noticeTitleButton}
            >
              {notice.title}
            </button>
            <span className={styles.noticeDate}>{notice.date}</span>
          </li>
        ))}
      </ul>

      {selectedNotice && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={e => e.stopPropagation()}
          >
            <h3 className={styles.modalTitle}>{selectedNotice.title}</h3>
            <p className={styles.modalDate}>{selectedNotice.date}</p>
            <p className={styles.modalDescription}>{selectedNotice.description}</p>
            <button onClick={closeModal} className={styles.closeButton}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}