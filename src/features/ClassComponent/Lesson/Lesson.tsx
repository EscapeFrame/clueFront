import {
  LessonPageContainer,ContentContainer,
  LessonCardWrapper,InfoBoardWrapper,
} from "./styles";
import { Directories } from "@/shared/theme/LessonTheme";
import Customapi from "@/shared/api/axios";
import LessonCard from "./LessonCard";
import InfoBoard from "./InfoBoard/InfoBoard";
import { useEffect, useState } from "react";

// 디렉토리 항목
export interface DirectoryItem {
  id: number;
  name: string;             // 디렉토리 이름
  directoryOrder: number;   // 디렉토리 순서
  url?: string;             // 해당 디렉토리 링크
  isRead: boolean;          // 읽음 여부
}

// 디렉토리 묶음
export interface DirectorySection {
  classRoomId: string;         // 교실 ID
  title: string;               // 교실 이름 또는 그룹명
  items: DirectoryItem[];      // 디렉토리 리스트
  isExpanded?: boolean;        // UI 제어용
}

export default function Lesson() {
  // const [directories,setDirectories] = useState<DirectorySection>()
  
  // useEffect(() => {
  //   Customapi
  // })

  return (
    <LessonPageContainer>
      <ContentContainer>
        <LessonCardWrapper>
          <LessonCard sections={Directories} />
        </LessonCardWrapper>
        <InfoBoardWrapper>
          <InfoBoard />
        </InfoBoardWrapper>
      </ContentContainer>
    </LessonPageContainer>
  );
}