import React, { useState, useEffect } from "react";
import * as s from "./styles";
import { Doc } from "../api"; // Import Doc type

interface Step3Props {
    docs: Doc[];
    isGenerating: boolean;
    onNext: () => void;
    onBack?: () => void;
}

export default function Step3({ docs, isGenerating, onNext, onBack }: Step3Props) {
    const [selectedDocIndex, setSelectedDocIndex] = useState<number>(0);
    const [currentContent, setCurrentContent] = useState<string>("");

    useEffect(() => {
        if (docs.length > 0) {
            setCurrentContent(docs[selectedDocIndex].content);
        } else {
            setCurrentContent("");
        }
    }, [docs, selectedDocIndex]);

    const handleDocSelect = (index: number) => {
        setSelectedDocIndex(index);
    };

    return (
        <s.Container>
            {/* 좌측 사이드바 (버튼형 메뉴) */}
            <s.Sidebar>
                <s.SideBox>
                    <s.MenuList>
                        {docs.map((doc, index) => (
                            <li key={index}>
                                <s.MenuButton
                                    active={selectedDocIndex === index}
                                    onClick={() => handleDocSelect(index)}
                                >
                                    {doc.index}
                                </s.MenuButton>
                            </li>
                        ))}
                    </s.MenuList>
                </s.SideBox>
            </s.Sidebar>

            {/* 메인 컨텐츠 */}
            <s.Content>
                <s.PageTitle>수업 자료 편집</s.PageTitle>
                {isGenerating ? (
                    <s.LoadingBox>
                        <p>문서 생성 중...</p>
                    </s.LoadingBox>
                ) : (
                    <s.Form>
                        <s.Field>
                            <s.TextAreaBox
                                value={currentContent}
                                onChange={(e) => setCurrentContent(e.target.value)}
                                disabled={isGenerating || docs.length === 0}
                                aria-label="문서 내용 편집"
                            />
                        </s.Field>

                        <s.ButtonRow>
                            <s.Button variant="secondary" type="button" onClick={onBack}>
                                이전
                            </s.Button>
                            <s.Button variant="primary" type="button" onClick={onNext} disabled={isGenerating || docs.length === 0}>
                                다음
                            </s.Button>
                        </s.ButtonRow>
                    </s.Form>
                )}
            </s.Content>
        </s.Container>
    );
}