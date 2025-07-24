import * as s from './styles';
import { useLocation, useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message || '페이지를 찾을 수 없습니다.';

  return (
    <s.Container>
      <s.Image src="/NotFound.png" alt="error" />
      <s.Message>{message}</s.Message>
      <s.GoToMain onClick={() => navigate(-1)}>
        &lt;&nbsp; 이전 페이지로 돌아가기
      </s.GoToMain>
    </s.Container>
  );
}