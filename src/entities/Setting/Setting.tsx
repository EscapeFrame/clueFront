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
        refs[section].current?.scrollIntoView({ behavior: "smooth" });
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
            
            const scrollPosition = contentRef.current.scrollTop + 100;
            
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