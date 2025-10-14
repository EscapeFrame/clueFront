// src/linkSave/entities/Header.tsx

import React from 'react';
import * as s from './styles';
// SearchBar 컴포넌트는 제공해주신 경로를 따릅니다.
import SearchBar from '@/linkSave/components/SearchBar'; 

interface HeaderProps {
    onAddLink: () => void; // 링크 추가 핸들러
    onSelectCategory: (category: string) => void; // 카테고리 선택 핸들러
    activeCategory: string;
}

export default function Header({ onAddLink, onSelectCategory, activeCategory }: HeaderProps) {
    const categories = ['전체', '반', '인문과목', '전공과목', '방과후'];

    return (
            <s.HeaderContainer>
                <s.TopRow>
                    <s.AddLinkButton onClick={onAddLink}>
                        + 링크 추가
                    </s.AddLinkButton>
                </s.TopRow>
                <s.Container>
                    <s.ItemContainer>
                        {categories.map(category => (
                            <li key={category}>
                                <s.Item
                                    onClick={() => onSelectCategory(category)}
                                    className={activeCategory === category ? 'active' : ''}
                                >
                                    {category}
                                </s.Item>
                            </li>
                        ))}
                    </s.ItemContainer>
                    <s.SearchContainer>
                        <SearchBar onSearch={(query) => console.log('Searching for:', query)} />
                    </s.SearchContainer>
                </s.Container>
            </s.HeaderContainer>
    );
}