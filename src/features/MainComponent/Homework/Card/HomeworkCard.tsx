import { useNavigate } from 'react-router-dom';
import { Container, BeforeWeek, Week, AfterWeek, HomeSchool } from './Card.styles';

interface CardType {
  date: number;
  body: string;
  link: string;
}

export function Card({ date, body, link }: CardType) {
  const navigate = useNavigate();

  let DayComponent = AfterWeek;
  if (date <= 7) DayComponent = BeforeWeek;
  else if (date <= 14) DayComponent = Week;

  return (
    <Container>
      <DayComponent>D - {date}</DayComponent>
      <p>{body}</p>
      <HomeSchool onClick={() => navigate(link)} style={{ cursor: 'pointer' }}>
        제출 &gt;
      </HomeSchool>
    </Container>
  );
}
