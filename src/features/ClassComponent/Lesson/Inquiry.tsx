import React, { useState } from 'react';
import styles from '@/shared/css/Class/Lesson/Inquiry.module.css';
import { inquiries, InquiryItem } from '@/shared/theme/InquiryTheme';

export default function Inquiry() {
  const [modalContent, setModalContent] = useState<InquiryItem | null>(null);

  return (
    <>
      <div className={styles.inquiryWrapper}>
        <h2 className={styles.TitleFont}>문의사항</h2>
        <ul className={styles.inquiryList}>
          {inquiries.map(({ id, title, studentId, content }) => (
            <li key={id} className={styles.inquiryItem}>
              <button
                className={styles.inquiryTitleButton}
                onClick={() => setModalContent({ id, title, studentId, content })}
              >
                {title}
              </button>
              <span className={styles.studentId}>{studentId}</span>
            </li>
          ))}
        </ul>
      </div>

      {modalContent && (
        <div
          className={styles.modalOverlay}
          onClick={() => setModalContent(null)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className={styles.modalTitle}>{modalContent.title}</h3>
            <p className={styles.modalStudentId}>{modalContent.studentId}</p>
            <p className={styles.modalDescription}>{modalContent.content}</p>
            <button
              className={styles.closeButton}
              onClick={() => setModalContent(null)}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </>
  );
}