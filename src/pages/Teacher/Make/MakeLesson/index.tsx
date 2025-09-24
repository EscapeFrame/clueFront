import React from "react";
import * as s from "./styles";
import DirectorySelect from "@/entities/Make/Lesson/directory/DirectorySelect";
import LessonCard from "@/entities/Make/Lesson/Card";
import { lessonCards } from "@/entities/Make/Lesson/Card/data";
import { useParams, useNavigate } from "react-router-dom";

const LessonCreator: React.FC = () => {
  const navigate = useNavigate();
  const useparams = useParams();
  const { classRoomId } = useparams
  const { directoryId } = useparams

  console.log(classRoomId)

  const handleCardClick = (url: string) => {
    navigate(url);
  };

  if (!classRoomId) {
    return false;
  }

  if(!directoryId) {
    return false;
  }

  return (
    <s.Container>
      <s.Title>수업 만들기</s.Title>
      <s.desc>어떤 형식의 수업을 원하시나요?</s.desc>

      {classRoomId && <DirectorySelect classRoomId={classRoomId} />}

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