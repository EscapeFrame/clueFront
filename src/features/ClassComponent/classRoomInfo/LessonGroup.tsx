import React, { useState, useEffect } from "react";

import TabSelector from "./TabSelector";
import Lesson from "../lesson/Lesson";
import Exam from "../exam/Exam";
import { Assignment } from "../assignment/Assignment";

const LessonGroup: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>(() => {
    return localStorage.getItem("selectedTab") || "Lesson"; // 기본값으로 "Lesson" 설정
  });

  // selectedTab이 바뀔 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("selectedTab", selectedTab);
  }, [selectedTab]);

  return (
    <>
      <TabSelector selectedTab={selectedTab} onSelectTab={setSelectedTab} />

      {selectedTab === "Lesson" && <Lesson />}
      {selectedTab === "Assignment" && <Assignment />}
      {selectedTab === "Exam" && <Exam />}
    </>
  );
};

export default LessonGroup;