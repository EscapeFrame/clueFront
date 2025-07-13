import React from "react";
import * as S from "./styles";

interface TabSelectorProps {
  selectedTab: string;
  onSelectTab: (tab: string) => void;
}

const TabSelector: React.FC<TabSelectorProps> = ({ selectedTab, onSelectTab }) => {
  return (
    <S.TabSelector>
      <S.TabButton
        active={selectedTab === "Lesson"}
        onClick={() => onSelectTab("Lesson")}
      >
        수업
      </S.TabButton>
      <S.TabButton
        active={selectedTab === "Assignment"}
        onClick={() => onSelectTab("Assignment")}
      >
        과제
      </S.TabButton>
      <S.TabButton
        active={selectedTab === "Exam"}
        onClick={() => onSelectTab("Exam")}
      >
        시험
      </S.TabButton>
    </S.TabSelector>
  );
};

export default TabSelector;