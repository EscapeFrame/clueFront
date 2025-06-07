import styles from '@/shared/css/NotFound.module.css'
import { Link } from 'react-router-dom'

// Not Found 페이지
function NotFound() {
    return (
        // 다운이미지 사용
        <div className={styles.container}>
            <img src="/NotFound.svg" alt="에러페이지" />
            {/* 메인페이지 이동으로 변경 */}
            <Link to="/" className={styles.gotomain}>&lt;&nbsp; 메인 페이지로 이동하기</Link>
        </div>
    )
}

export default NotFound