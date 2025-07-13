import { Link } from 'react-router-dom';
import { Card, LogoBox, TextOverImage } from './Card.styles';

export type OtherCardType = {
  href: string;
  src?: string;
  homepage?: string;
} 

const OtherCard = ({ href, src = '/default.jpeg', homepage }: OtherCardType) => {
  return (
    <Link to={href} style={{ textDecoration: 'none' }}>
      <Card>
        <LogoBox>
          <img src={src} alt="샘플" width={160} height={210} />
          {homepage && <TextOverImage>{homepage}</TextOverImage>}
        </LogoBox>
      </Card>
    </Link>
  );
};

export default OtherCard;
