import React, { useState, useEffect } from "react";
import TabSelector from "../../ClassRoomInfo/TabSelector";
import TLesson from "../Lesson/TLesson";
import Exam from "../../Exam/Exam";
import { TAssignment } from "../Assignment/TAssignment";

const TLessonGroup: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>(() => {
    return localStorage.getItem("selectedTab") || "Lesson"; // 기본값으로 "Lesson" 설정
  });

  // selectedTab이 바뀔 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("selectedTab", selectedTab);
  }, [selectedTab]);

  return (
    <div>
      <TabSelector selectedTab={selectedTab} onSelectTab={setSelectedTab} />

      {selectedTab === "Lesson" && <TLesson />}
      {selectedTab === "Assignment" && <TAssignment />}
      {selectedTab === "Exam" && <Exam />}
    </div>
  );
};

export default TLessonGroup;