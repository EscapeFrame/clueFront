import React, { useState, useEffect } from "react";
import * as s from "./styles";
import Customapi from "@/shared/config/api";

interface StepProps {
  onNext: (data: { title: string; goal: string; keywords: string[]; files: File[] }) => void;
}

export default function Step3({ onNext }: StepProps) {
  const [title, setTitle] = useState("");
  const [serverText, setServerText] = useState("");

  const isFormValid = title.trim() !== "";

  useEffect(() => {
    let mounted = true;
    const fetchText = async () => {
      try {
        const res = await Customapi.get<{ text: string }>(
          "/api/materials/sample-text"
        );
        if (mounted) setServerText(res.data?.text || "");
      } catch (err) {
        console.error("Step3: 서버 텍스트 로드 실패", err);
      }
    };
    fetchText();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <s.Container>
      {/* 좌측 사이드바 */}
      <s.Sidebar>
        <s.SideBox>
          <s.SideTitle>이론</s.SideTitle>
          <s.MenuList>
            <li>예제코드</li>
            <li>실습문제</li>
            <li>미니과제</li>
            <li className="active">이론</li>
          </s.MenuList>
        </s.SideBox>
      </s.Sidebar>

      {/* 메인 컨텐츠 */}
      <s.Content>
        <s.PageTitle>수업 자료 편집</s.PageTitle>

        <s.Form>
          <s.Field>
            <label>수업자료명 *</label>
            <input
              type="text"
              placeholder="과목명을 입력해 주세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </s.Field>

          <s.Field>
            <label>서버에서 불러온 텍스트</label>
            <s.TextAreaBox>
              {serverText ? serverText : "서버에서 불러오는 중..."}
            </s.TextAreaBox>
          </s.Field>

          <s.ButtonRow>
            <s.Button variant="secondary" type="button">
              이전
            </s.Button>
            <s.Button variant="primary" type="button" disabled={!isFormValid}>
              전송
            </s.Button>
          </s.ButtonRow>
        </s.Form>
      </s.Content>
    </s.Container>
  );
}