import * as s from './styles';
import { useNavigate } from 'react-router-dom';

export default function MyClass() {
  const navigate = useNavigate();

  return (
    <s.Body>
      <s.Flexible>
        <s.TitleFont>나의 학습실</s.TitleFont>
        <s.AddButton onClick={() => navigate('/class/make')}>학습실 추가</s.AddButton>
      </s.Flexible>
    </s.Body>
  );
}