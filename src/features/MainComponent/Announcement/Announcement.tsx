import styles from '@/shared/css/Home/Accouncement/Announcement.module.css';
// import Inventory from './Inventory.tsx';

export default function Announcement() {
  return (
    <div className={styles.topContainer}>
      <div className={styles.container}>
        <h1>공지안내</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p>학교의 소식을 빠르게 알아보세요!</p>
          <p>더보기 &gt;</p>
        </div>
        <div className={styles.row}>
          <div className={styles.card}>
            <span className={styles.title}>서비스공지</span>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p>임시 코드</p>
              <p>날짜</p>
            </div>
          </div>
          <div className={styles.card}>
            <span className={styles.title}>학교공지</span>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p>임시 코드</p>
              <p>날짜</p>
            </div>
          </div>
          <div className={styles.card}>
            <span className={styles.title}>일정안내</span>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p>임시 코드</p>
              <p>날짜</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
