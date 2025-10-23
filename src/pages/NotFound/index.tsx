import * as s from './styles';
import { useLocation, useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  const location = useLocation();
  const errorCode = location.state?.errorCode || 404;
  const customMessage = location.state?.message;

  return (
    <s.Container>
      <div>
        <s.ErrorCode>{errorCode} <br /> <b>Error</b></s.ErrorCode>
        <s.Bar></s.Bar>
        <s.Message>죄송합니다. <br />{customMessage || '페이지를 찾을 수 없습니다.'}</s.Message>
        <s.ButtonContainer>
          <s.GoToMain onClick={() => navigate(-1)}>
            이전으로
          </s.GoToMain>
          <s.Retry onClick={() => window.location.reload()}>
            재시도
          </s.Retry>
        </s.ButtonContainer>
      </div>
      <s.Image src="/NotFound.png" alt="error" />
    </s.Container>
  );
}
