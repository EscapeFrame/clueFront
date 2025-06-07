import styles from '@/shared/css/Home/footer/TeamFooter.module.css';

export default function TeamFooter() {
  return (
    <div className={styles.topContainer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <img
            src="/TeamLogo.png"
            alt="샘플"
            width={245}
            height={45}
          />
          <div className={styles.itemList}>
            <div className={styles.content}>
              <p className={styles.item}>김민재</p>
              <p>보안</p>
            </div>
            <div className={styles.content}>
              <p className={styles.item}>김한결</p>
              <p>백엔드</p>
            </div>
            <div className={styles.content}>
              <p className={styles.item}>공덕현</p>
              <p>프론트엔드</p>
            </div>
            <div className={styles.content}>
              <p className={styles.item}>안재민</p>
              <p>앱</p>
            </div>
            <div className={styles.content}>
              <p className={styles.item}>노유현</p>
              <p>디자인</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
