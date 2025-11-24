import React, { useState, useEffect } from "react";
import * as s from "./styles";
import { Doc, patchAgentDoc } from "../api"; // Import Doc type and patch function

interface Step3Props {
    docs: Doc[];
    isGenerating: boolean;
    onNext: () => void;
    onBack?: () => void;
    agentId?: string;
}

export default function Step3({ docs, isGenerating, onNext, onBack, agentId }: Step3Props) {
    const [selectedDocIndex, setSelectedDocIndex] = useState<number>(0);
    const [currentContent, setCurrentContent] = useState<string>("");
    const [isSending, setIsSending] = useState<boolean>(false);

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

    // Update the corresponding doc's content in the docs array when textarea changes
    const updateCurrentDocContent = (value: string) => {
        setCurrentContent(value);
        // mutate passed-in docs array to prepare payload — keep minimal and best-effort
        if (docs && docs[selectedDocIndex]) {
            docs[selectedDocIndex].content = value;
        }
    };

    const handleSend = async () => {
    if (!agentId) console.warn('agentId prop not provided. Request may fail.');

        if (docs.length === 0) return;

        setIsSending(true);
        const payload = { docs: docs.map((d) => ({ index: d.index, content: d.content })) };
        console.log('Sending PATCH payload to /api/v1/agents/{agent_id}/doc', payload);

        try {
            // If agentId not known, fall back to reading from first doc's potential meta (not guaranteed)
            const idToUse = agentId ?? (window?.location?.pathname?.split('/')?.pop() || undefined);
            if (!idToUse) console.warn('No agent id available; request may fail.');

            const res = await patchAgentDoc(idToUse as string, payload.docs);
            console.log('PATCH response', res);
            // show response in network and console; onNext can be called to proceed
            onNext();
        } catch (err) {
            console.error('Failed to patch agent doc', err);
        } finally {
            setIsSending(false);
        }
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
                                onChange={(e) => updateCurrentDocContent(e.target.value)}
                                disabled={isGenerating || docs.length === 0}
                                aria-label="문서 내용 편집"
                            />
                        </s.Field>

                        <s.ButtonRow>
                            <s.Button variant="secondary" type="button" onClick={onBack}>
                                이전
                            </s.Button>
                            <s.Button variant="primary" type="button" onClick={handleSend} disabled={isGenerating || isSending || docs.length === 0}>
                                {isSending ? '전송중...' : '내용전송'}
                            </s.Button>
                        </s.ButtonRow>
                    </s.Form>
                )}
            </s.Content>
        </s.Container>
    );
}