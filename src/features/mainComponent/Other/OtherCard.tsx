import styles from '@/shared/css/Home/Other/OtherCard.module.css';
import { Link } from 'react-router-dom';

export type OtherCardType = {
  href: string;
  src?: string;
  homepage?: string;
} 

const OtherCard = ({ href, src = '/default.jpeg', homepage }: OtherCardType) => {
  const handleCardClick = () => {
    window.open(href, '_blank');
  };
  return (
    <Link to={href} className={styles.card}>
      <div className={styles.logoBox}>
        <img src={src} alt="샘플" width={160} height={210} />
        {homepage && <div className={styles.textOverImage}>{homepage}</div>}
      </div>
    </Link>
  );
};

export default OtherCard;
