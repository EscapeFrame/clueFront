import * as s from './styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TabSelector from '@/features/Common/Class/TabSelector';
import { CategoryKey, CATEGORY_FILTER_MAP } from '@/features/Common/Class/TabSelector/category';

import { useMyClass } from '@/features/Common/MyClass/hooks/useMyClass';
import { FiPlus } from "react-icons/fi";
import { IoBookOutline } from "react-icons/io5";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { FaRegClock } from "react-icons/fa6";

export default function MyClass() {
  const navigate = useNavigate();
  const { myClasses, error } = useMyClass();
  const [selectedTab, setSelectedTab] = useState<CategoryKey>('전체');
  const [searchValue, setSearchValue] = useState('');

  // 필터 로직
  const filteredClasses = myClasses.filter((cls) => {
    const filterValue = CATEGORY_FILTER_MAP[selectedTab as CategoryKey];
    const tabMatch = filterValue === null ? true : cls.categoryKey === filterValue;
    const searchMatch = cls.name.toLowerCase().includes(searchValue.toLowerCase());
    return tabMatch && searchMatch;
  });

  const handleViewClass = (id: string | number) => navigate(`/class/${id}`);

  const getIconByCategory = (categoryKey: string) => {
    switch (categoryKey) {
      case 'GENERAL':
        return <IoBookOutline />;
      case 'MAJOR':
        return <HiOutlineAcademicCap />;
      case 'AFTER':
        return <FaRegClock />;
      default:
        return null;
    }
  };

  return (
    <s.Container>
      <s.HeaderSection>
        <s.HeaderContent>
          <s.TitleFont>나의 학습실</s.TitleFont>
          <s.AddButton onClick={() => navigate('/class/make')}>
            <FiPlus />&nbsp; 학습실 추가
          </s.AddButton>
        </s.HeaderContent>

        {error && <s.ErrorMessage>{error}</s.ErrorMessage>}

        <TabSelector
          selectedTab={selectedTab}
          onSelectTab={(tab) => setSelectedTab(tab as CategoryKey)}
          onSearch={(query) => setSearchValue(query)}
        />
      </s.HeaderSection>

      <s.CardArea>
        {!filteredClasses.length ? (
          <s.EmptyMessage>참여한 학습실이 없습니다.</s.EmptyMessage>
        ) : (
          <s.Grid>
            {filteredClasses.map((cls, idx) => (
              <s.Card key={cls.classRoomId || `myclass-${idx}`} onClick={() => handleViewClass(cls.classRoomId)}>
                <s.CardHeader>
                  <s.IconWrapper>{getIconByCategory(cls.categoryKey)}</s.IconWrapper>
                  <s.CardTitle>{cls.name}</s.CardTitle>
                </s.CardHeader>

                <s.InfoContent>
                  {cls.categoryKey || '-'} | {cls.assignedClass || '-'}
                </s.InfoContent>

                <s.CardDescription>{cls.description || '설명이 없습니다.'}</s.CardDescription>
              </s.Card>
            ))}
          </s.Grid>
        )}
      </s.CardArea>
    </s.Container>
  );
}