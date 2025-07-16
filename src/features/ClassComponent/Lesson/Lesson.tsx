import {
  LessonPageContainer,ContentContainer,
  LessonCardWrapper,InfoBoardWrapper,
} from "./styles";
import { Directories } from "@/shared/theme/LessonTheme";
import Customapi from "@/shared/api/axios";
import LessonCard from "./LessonCard";
import InfoBoard from "./InfoBoard/InfoBoard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
  const { classId } = useParams<{ classId: string }>();
  const [directories,setDirectories] = useState<DirectorySection[]>([])

  useEffect(() => {
    if (classId) {
      Customapi.get(`/api/class/${classId}/all`)
        .then(res => { 
          console.log(res.data);
          const data = res.data;
          // directoryList를 DirectorySection[] 형태로 변환
          const sections = (data.directoryList ?? []).map((dir: any) => ({
            classRoomId: String(data.classRoomId),
            title: dir.directoryName,
            items: (dir.documentList ?? []).map((doc: any) => ({
              id: doc.documentId,
              name: doc.title,
              directoryOrder: dir.directoryOrder,
              url: undefined, // 필요시 doc에 url 필드 추가
              isRead: false,  // 필요시 읽음 여부 계산
            })),
            isExpanded: false,
          }));
          setDirectories(sections);
        })
        .catch(err => console.error(err));
    }
  }, [classId]);

  return (
    <LessonPageContainer>
      <ContentContainer>
        <LessonCardWrapper>
          <LessonCard sections={directories} classId={classId} />
        </LessonCardWrapper>
        <InfoBoardWrapper>
          <InfoBoard />
        </InfoBoardWrapper>
      </ContentContainer>
    </LessonPageContainer>
  );
}