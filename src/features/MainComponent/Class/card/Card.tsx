import { HomeSchool, Container } from "./Card.styles";

interface CardProps {
  tittle: string;
  subject: string;
  classRoom: string;
  people: number
}

export function Card({ tittle, subject, classRoom, people }: CardProps) {
  return (
    <Container>
        <h2>{tittle}</h2>
        <p>{subject} | {classRoom}</p>
        <p>학생{people}명</p>
        <HomeSchool>과제보기 &gt;</HomeSchool>
    </Container>
  );
}