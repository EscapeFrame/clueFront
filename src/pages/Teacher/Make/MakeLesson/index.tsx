import React from "react";
import * as s from "./styles";
import DirectorySelect from "@/entities/Make/Lesson/directory/DirectorySelect";
import LessonCard from "@/entities/Make/Lesson/Card";
import { lessonCards } from "@/entities/Make/Lesson/Card/data";
import { useParams } from "react-router-dom";

const LessonCreator: React.FC = () => {
  const { classRoomId } = useParams<{ classRoomId: string }>();
  const id = classRoomId ? Number(classRoomId) : null;

  const handleCardClick = (url: string) => {
    window.location.href = url;
  };

  return (
    <s.Container>
      <s.Title>수업 만들기</s.Title>
      <s.desc>어떤 형식의 수업을 원하시나요?</s.desc>

      {id !== null && <DirectorySelect classRoomId={id} />}

      <s.Grid>
        {lessonCards.map((card) => (
          <LessonCard
            key={card.title}
            title={card.title}
            desc={card.desc}
            url={card.url}
            onSelect={handleCardClick}
          />
        ))}
      </s.Grid>
    </s.Container>
  );
};

export default LessonCreator;