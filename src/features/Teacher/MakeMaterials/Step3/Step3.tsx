import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as s from "./styles";
import { Doc, patchAgentDoc } from "../api"; // Import Doc type and patch function
import Customapi from '@/shared/config/api';

interface Step3Props {
    docs: Doc[];
    isGenerating: boolean;
    onNext: () => void;
    onBack?: () => void;
    agentId?: string;
    isProcessing?: boolean;
}

export default function Step3({ docs, isGenerating, onNext, onBack, agentId, isProcessing = false }: Step3Props) {
    const { classRoomId, directoryId } = useParams<{ classRoomId: string; directoryId: string }>();
    const [selectedDocIndex, setSelectedDocIndex] = useState<number>(0);
    const [localDocs, setLocalDocs] = useState<Doc[]>([]);
    const [currentContent, setCurrentContent] = useState<string>("");
    const [isSending, setIsSending] = useState<boolean>(false);

    // Initialize local copy when docs prop changes
    useEffect(() => {
        setLocalDocs(docs.map((d) => ({ ...d })));
        setSelectedDocIndex(0);
    }, [docs]);

    // keep currentContent in sync with selected local doc
    useEffect(() => {
        if (localDocs.length > 0 && localDocs[selectedDocIndex]) {
            setCurrentContent(localDocs[selectedDocIndex].content);
        } else {
            setCurrentContent("");
        }
    }, [localDocs, selectedDocIndex]);

    const handleDocSelect = (index: number) => {
        setSelectedDocIndex(index);
    };

    // Update the corresponding doc's content in the docs array when textarea changes
    const updateCurrentDocContent = (value: string) => {
        setCurrentContent(value);
        // update local copy immutably
        setLocalDocs((prev) => {
            if (!prev[selectedDocIndex]) return prev;
            const next = [...prev];
            next[selectedDocIndex] = { ...next[selectedDocIndex], content: value };
            return next;
        });
    };

    const handleSend = async () => {
        if (!agentId) console.warn('agentId prop not provided. Request may fail.');

        if (localDocs.length === 0) return;

        setIsSending(true);
        const payload = { docs: localDocs.map((d) => ({ index: d.index, content: d.content })) };
        console.log('Sending PATCH payload to /api/v1/agents/{agent_id}/doc', payload);

        try {
            // If agentId not known, fall back to reading from first doc's potential meta (not guaranteed)
            const idToUse = agentId ?? (window?.location?.pathname?.split('/')?.pop() || undefined);
            if (!idToUse) console.warn('No agent id available; request may fail.');

            const res = await patchAgentDoc(idToUse as string, payload.docs);
            console.log('PATCH response', res);

            // After successful PATCH, create markdown file and upload
            // 1. Convert localDocs to markdown format
            const markdownContent = localDocs
                .map((doc) => `# ${doc.index}\n${doc.content}`)
                .join('\n\n');

            // 2. Create File from markdown string
            const blob = new Blob([markdownContent], { type: 'text/markdown' });
            const file = new File([blob], 'document.md', { type: 'text/markdown' });

            // 3. Get classRoomId and directoryId from URL params (useParams hook)
            if (!classRoomId || !directoryId) {
                console.warn('classRoomId or directoryId missing from URL params');
                alert('URL 경로에 classRoomId 또는 directoryId가 없습니다.');
                onNext();
                return;
            }

            // 4. Upload file to /api/document/file
            const formData = new FormData();
            formData.append('classRoomId', classRoomId);
            formData.append('directoryId', directoryId);
            formData.append('files', file);

            console.log('Uploading markdown file to /api/document/file');
            const uploadRes = await Customapi.post('/api/document/file', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('File upload response', uploadRes.data);

            onNext();
        } catch (err) {
            console.error('Failed to patch agent doc or upload file', err);
            alert('문서 전송 또는 파일 업로드에 실패했습니다.');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <s.Container>
            {/* 좌측 사이드바 (버튼형 메뉴) */}
            {!(isGenerating || isProcessing) && (
                <s.Sidebar>
                    <s.SideBox>
                        <s.MenuList>
                            {docs.map((doc, index) => (
                                <li key={index}>
                                    <s.MenuButton
                                        active={selectedDocIndex === index}
                                        onClick={() => handleDocSelect(index)}
                                        disabled={isGenerating || isProcessing || isSending}
                                    >
                                        {doc.index}
                                    </s.MenuButton>
                                </li>
                            ))}
                        </s.MenuList>
                    </s.SideBox>
                </s.Sidebar>
            )}

            {/* 메인 컨텐츠 */}
            <s.Content>
                <s.PageTitle>수업 자료 편집</s.PageTitle>
                {(isGenerating || isProcessing) ? (
                    <s.SpinnerOverlay>
                        <s.Spinner />
                    </s.SpinnerOverlay>
                ) : (
                    <s.Form>
                        <s.Field>
                            <s.TextAreaBox
                                value={currentContent}
                                onChange={(e) => updateCurrentDocContent(e.target.value)}
                                disabled={isGenerating || isProcessing || docs.length === 0}
                                aria-label="문서 내용 편집"
                            />
                        </s.Field>

                        <s.ButtonRow>
                            <s.Button variant="secondary" type="button" onClick={onBack} disabled={isGenerating || isSending || isProcessing}>
                                이전
                            </s.Button>
                            <s.Button variant="primary" type="button" onClick={handleSend} disabled={isGenerating || isSending || isProcessing || docs.length === 0}>
                                {isSending ? '전송중...' : '내용전송'}
                            </s.Button>
                        </s.ButtonRow>
                    </s.Form>
                )}
            </s.Content>
        </s.Container>
    );
}