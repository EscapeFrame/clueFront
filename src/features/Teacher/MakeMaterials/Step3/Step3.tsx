import React, { useState, useEffect, useRef } from "react";
import * as s from "./styles";
import Customapi from "@/shared/config/api";

interface StepProps {
    onNext: (data: { title: string; goal: string; keywords: string[]; files: File[] }) => void;
}

export default function Step3({ onNext }: StepProps) {
    const [serverText, setServerText] = useState("");
    const [activeSection, setActiveSection] = useState<'theory' | 'example' | 'practice' | 'mini'>('theory');
    const [loading, setLoading] = useState(false);

    const isFormValid = serverText.trim() !== "";

    const textRef = useRef<HTMLTextAreaElement | null>(null);

    const autosize = () => {
        const el = textRef.current;
        if (!el) return;
        el.style.height = 'auto';
        const maxPx = 28 * parseFloat(getComputedStyle(document.documentElement).fontSize || '16'); // 28rem in px (approx)
        const newHeight = Math.min(el.scrollHeight, maxPx);
        el.style.height = `${newHeight}px`;
    };

    useEffect(() => {
        let mounted = true;
        const fetchText = async (section: string) => {
            setLoading(true);
            try {
                const res = await Customapi.get<{ text: string }>(`/api/materials/section/${section}`);
                if (mounted) setServerText(res.data?.text || "");
            } catch (err) {
                console.error("Step3: 서버 텍스트 로드 실패", err);
                if (mounted) setServerText('서버에서 내용을 불러오지 못했습니다.');
            } finally {
                if (mounted) setLoading(false);
            }
        };
        fetchText(activeSection);
        return () => {
            mounted = false;
        };
    }, [activeSection]);

    useEffect(() => {
        // adjust height after serverText updates
        autosize();
    }, [serverText, loading]);

    return (
        <s.Container>
            {/* 좌측 사이드바 (버튼형 메뉴) */}
            <s.Sidebar>
                <s.SideBox>
                    <s.MenuList>
                        <li>
                            <s.MenuButton active={activeSection === 'example'} onClick={() => setActiveSection('example')}>예제코드</s.MenuButton>
                        </li>
                        <li>
                            <s.MenuButton active={activeSection === 'practice'} onClick={() => setActiveSection('practice')}>실습문제</s.MenuButton>
                        </li>
                        <li>
                            <s.MenuButton active={activeSection === 'mini'} onClick={() => setActiveSection('mini')}>미니과제</s.MenuButton>
                        </li>
                        <li>
                            <s.MenuButton active={activeSection === 'theory'} onClick={() => setActiveSection('theory')}>이론</s.MenuButton>
                        </li>
                    </s.MenuList>
                </s.SideBox>
            </s.Sidebar>

            {/* 메인 컨텐츠 */}
            <s.Content>
                <s.PageTitle>수업 자료 편집</s.PageTitle>
                <s.Form>
                    <s.Field>
                        <s.TextAreaBox
                            ref={textRef}
                            value={serverText}
                            onChange={(e) => { setServerText(e.target.value); autosize(); }}
                            disabled={loading}
                            aria-label="서버 텍스트 편집"
                        />
                    </s.Field>

                    <s.ButtonRow>
                        <s.Button variant="secondary" type="button">
                            재요청
                        </s.Button>
                        <s.Button variant="primary" type="button" disabled={!isFormValid}>
                            내용 전송
                        </s.Button>
                    </s.ButtonRow>
                </s.Form>
            </s.Content>
        </s.Container>
    );
}