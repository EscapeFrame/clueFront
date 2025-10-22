import data from './data';
import * as s from './styles';

export function QuickLink() {
  return (
    <s.Container>
      <div>
        <s.Title>학교 서비스 바로가기</s.Title>
        <s.Explain>다양한 학교 서비스를 바로 이동해보세요!</s.Explain>
      </div>
      <s.LinkContainer>
        {data.map(({ href, homepage, src }) => (
          <s.Link key={href} href={href} target="_blank" rel="noopener noreferrer">
            <s.LogoBox>
              <img src={src} alt={homepage} />
              <s.TextOverImage>{homepage}</s.TextOverImage>
            </s.LogoBox>
          </s.Link>
        ))}
      </s.LinkContainer>
    </s.Container>
  );
}