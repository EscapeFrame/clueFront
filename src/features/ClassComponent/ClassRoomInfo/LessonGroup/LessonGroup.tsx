import React, { useState, useEffect } from "react";
import TabSelector from "@/features/ClassComponent/ClassRoomInfo/TabSelector/TabSelector";
import Lesson from "@/features/ClassComponent/Lesson/Lesson";
import Exam from "@/features/ClassComponent/Exam/Exam";
import { Assignment } from "@/features/ClassComponent/Assignment/Assignment";
import * as S from "./styles";

const LessonGroup: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>(() => {
    return localStorage.getItem("selectedTab") || "Lesson"; // 기본값으로 "Lesson" 설정
  });

  useEffect(() => {
    localStorage.setItem("selectedTab", selectedTab);
  }, [selectedTab]);

  return (
    <S.Container>
      <TabSelector selectedTab={selectedTab} onSelectTab={setSelectedTab} />
      {selectedTab === "Lesson" && <Lesson />}
      {selectedTab === "Assignment" && <Assignment />}
      {selectedTab === "Exam" && <Exam />}
    </S.Container>
  );
};

export default LessonGroup;