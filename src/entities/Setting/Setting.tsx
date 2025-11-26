import { useRef, useEffect } from "react";
import { UserSection } from "./UI/UserSection";
import { AlertSection } from "./UI/AlertSection";
import { ChatSection } from "./UI/ChatSection";
import * as S from './styles';

export function UserSetting() {
    const userRef = useRef<HTMLDivElement>(null);
    const chatRef = useRef<HTMLDivElement>(null);
    const alertRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    
    // 사이드바 제거로 인한 스크롤 핸들러는 생략합니다.

    useEffect(() => {
        const handleScroll = () => {
            if (!contentRef.current) return;
            
            // 현재 스크롤 위치 + 약간의 오프셋
            const scrollPosition = contentRef.current.scrollTop + 150;
            // 만약 userRef가 기준보다 위에 있으면 해당 섹션은 보이는 것으로 간주
            if (userRef.current && userRef.current.offsetTop <= scrollPosition) {
                // nothing to do currently; kept for future multi-section support
            }
        };

        const content = contentRef.current;
        content?.addEventListener('scroll', handleScroll);
        
        // 초기 로드 시에도 활성 섹션 확인
        handleScroll();
        
        return () => content?.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <S.Container>
            <S.Content ref={contentRef}>
                <div ref={userRef}><UserSection /></div>
                {/* <div ref={chatRef}><ChatSection /></div>
                <div ref={alertRef}><AlertSection /></div> */}
            </S.Content>
        </S.Container>
    );
}