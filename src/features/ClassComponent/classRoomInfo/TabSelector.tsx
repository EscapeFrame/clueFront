import React from "react";
import styles from "@/shared/css/Class/ClassRoomInfo/TabSelector.module.css";

interface TabSelectorProps {
  selectedTab: string;
  onSelectTab: (tab: string) => void;
}

const TabSelector: React.FC<TabSelectorProps> = ({ selectedTab, onSelectTab }) => {
  return (
    <div className={styles.TabSelector}>
      <button
        className={`${styles.TabButton} ${selectedTab === "Lesson" ? styles.Active : ""}`}
        onClick={() => onSelectTab("Lesson")}
      >
        수업
      </button>
      <button
        className={`${styles.TabButton} ${selectedTab === "Assignment" ? styles.Active : ""}`}
        onClick={() => onSelectTab("Assignment")}
      >
        과제
      </button>
      <button
        className={`${styles.TabButton} ${selectedTab === "Exam" ? styles.Active : ""}`}
        onClick={() => onSelectTab("Exam")}
      >
        시험
      </button>
    </div>
  );
};

export default TabSelector;