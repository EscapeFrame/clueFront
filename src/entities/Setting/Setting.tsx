import { useRef, useState, useEffect } from "react";
import { UserSection } from "./UI/UserSection";
import { AlertSection } from "./UI/AlertSection";
import { ChatSection } from "./UI/ChatSection";
import * as S from './styles';

export function UserSetting() {
    const userRef = useRef<HTMLDivElement>(null);
    const chatRef = useRef<HTMLDivElement>(null);
    const alertRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    
    const [activeSection, setActiveSection] = useState<"user" | "chat" | "alert">("user");

    const handleScrollTo = (section: "user" | "chat" | "alert") => {
        const refs = { user: userRef, chat: chatRef, alert: alertRef };
        const element = refs[section].current;
        
        if (element && contentRef.current) {
            const elementPosition = element.offsetTop;
            contentRef.current.scrollTo({
                top: elementPosition - 100, // 20px 여유 공간
                behavior: "smooth"
            });
        }
        setActiveSection(section);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (!contentRef.current) return;
            
            const sections = [
                { ref: userRef, name: "user" as const },
                { ref: chatRef, name: "chat" as const },
                { ref: alertRef, name: "alert" as const }
            ];
            
            // 현재 스크롤 위치 + 약간의 오프셋
            const scrollPosition = contentRef.current.scrollTop + 150;
            
            // 역순으로 확인하여 현재 보이는 섹션 찾기
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section.ref.current && section.ref.current.offsetTop <= scrollPosition) {
                    setActiveSection(section.name);
                    break;
                }
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
            <S.Sidebar>
                <S.MenuButton 
                    active={activeSection === "user"} 
                    onClick={() => handleScrollTo("user")}
                >
                    기본정보
                </S.MenuButton>
                <S.MenuButton 
                    active={activeSection === "chat"} 
                    onClick={() => handleScrollTo("chat")}
                >
                    보관된 채팅
                </S.MenuButton>
                <S.MenuButton 
                    active={activeSection === "alert"} 
                    onClick={() => handleScrollTo("alert")}
                >
                    기능별 알림설정
                </S.MenuButton>
            </S.Sidebar>

            <S.Content>
                <div ref={userRef}><UserSection /></div>
                <div ref={chatRef}><ChatSection /></div>
                <div ref={alertRef}><AlertSection /></div>
            </S.Content>
        </S.Container>
    );
}