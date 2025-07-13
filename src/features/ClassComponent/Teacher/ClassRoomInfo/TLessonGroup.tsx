import React, { useState, useEffect } from "react";
import TabSelector from "@/features/ClassComponent/ClassRoomInfo/TabSelector/TabSelector";
import TLesson from "@/features/ClassComponent/Teacher/Lesson/TLesson";
import Exam from "@/features/ClassComponent/Exam/Exam";
import { TAssignment } from "../Assignment/TAssignment";

// 예시 데이터
const dummySections = [
  {
    id: "sec1",
    title: "1주차 오리엔테이션",
    items: [
      { id: 1, title: "강의 소개", isRead: false },
      { id: 2, title: "수업 목표", isRead: true },
    ],
  },
];

const TLessonGroup: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>(() => {
    return localStorage.getItem("selectedTab") || "Lesson";
  });

  useEffect(() => {
    localStorage.setItem("selectedTab", selectedTab);
  }, [selectedTab]);

  return (
    <div>
      <TabSelector selectedTab={selectedTab} onSelectTab={setSelectedTab} />

      {selectedTab === "Lesson" && <TLesson sections={dummySections} />}
      {selectedTab === "Assignment" && <TAssignment />}
      {selectedTab === "Exam" && <Exam />}
    </div>
  );
};

export default TLessonGroup;