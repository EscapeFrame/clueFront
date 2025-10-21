import React, { useState } from "react";
import * as s from "./styles";
import { Chats } from "../data";
import { IoSearchOutline } from "react-icons/io5";

export const ChatSection: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChatClick = (link: string) => {
        window.location.href = link;
    };

    // 검색어에 맞는 채팅 필터링
    const filteredChats = Chats.filter(chat =>
        chat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <s.Section>
            <s.Wrapper>
                <s.SectionTitle>보관된 채팅</s.SectionTitle>
                <s.SectionExplan>저장된 채팅내역을 확인하고 관리하세요.</s.SectionExplan>
            </s.Wrapper>

            <s.SearchWrapper>
                <s.SearchInput
                    type="text"
                    placeholder="찾으시는 채팅명을 입력해주세요."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <s.SearchIcon> <IoSearchOutline /> </s.SearchIcon>
            </s.SearchWrapper>

            <s.ChatList>
                {filteredChats.map((chat) => (
                    <s.ChatItem key={chat.name} onClick={() => handleChatClick(chat.link)}>
                        <s.InfoArea>
                            <s.UserName>{chat.name}</s.UserName>
                            <s.LastMessage>{chat.lastMessage}</s.LastMessage>
                        </s.InfoArea>
                        <s.ChatDate>{chat.lastDate}</s.ChatDate>
                    </s.ChatItem>
                ))}
            </s.ChatList>
        </s.Section>
    );
}
