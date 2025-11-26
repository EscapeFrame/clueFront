import React from 'react';
import * as s from './styles';
import SearchBar from '@/linkSave/components/SearchBar';
import { baseCategoryData } from "./data";
import { IconType } from 'react-icons';

interface HeaderProps {
    onAddLink: () => void; // 링크 추가 핸들러
    onSelectCategory: (category: string) => void; // 카테고리 선택 핸들러
    activeCategory: string;
    onSearch: (query: string) => void;
}


export default function Header({ onAddLink, onSelectCategory, activeCategory, onSearch }: HeaderProps) {

    return (
        <s.HeaderContainer>
            <s.TopRow>
                <s.AddLinkButton onClick={onAddLink}>
                    + 링크 추가
                </s.AddLinkButton>
            </s.TopRow>
            <s.Container>
                <s.ItemContainer>
                    {baseCategoryData.map((item) => {
                        const Icon: IconType | undefined = item.icon;
                        return (
                            <li key={item.name}>
                                <s.Item
                                    onClick={() => onSelectCategory(item.name)}
                                    className={activeCategory === item.name ? 'active' : ''}
                                >
                                    {Icon && <Icon size={18} style={{ marginRight: '6px' }} />}
                                    {item.name}
                                </s.Item>
                            </li>
                        );
                    })}
                </s.ItemContainer>
                <s.SearchContainer>
                    <SearchBar onSearch={onSearch} />
                </s.SearchContainer>
            </s.Container>
        </s.HeaderContainer>
    );
}