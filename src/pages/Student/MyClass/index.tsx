import * as s from './styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TabSelector, { CategoryKey } from '@/features/Common/Class/TabSelector';
import { useMyClass } from '@/features/Common/MyClass/hooks/useMyClass';

export default function MyClass() {
  const navigate = useNavigate();
  const { myClasses, error } = useMyClass();
  const [selectedTab, setSelectedTab] = useState<CategoryKey>('전체');
  const [searchValue, setSearchValue] = useState('');

  // 탭 + 검색 필터링
  const filteredClasses = myClasses.filter((cls) => {
    const tabMatch = selectedTab === '전체' ? true : cls.subject?.includes(selectedTab);
    const searchMatch = cls.name.toLowerCase().includes(searchValue.toLowerCase());
    return tabMatch && searchMatch;
  });

  const handleViewClass = (id: string | number) => navigate(`/class/${id}`);

  return (
    <s.Container>
      <s.Flexible>
        <s.TitleFont>나의 학습실</s.TitleFont>
        <s.AddButton onClick={() => navigate('/class/make')}>학습실 추가</s.AddButton>
        {error && <s.ErrorMessage>{error}</s.ErrorMessage>}
      </s.Flexible>

      <TabSelector
        selectedTab={selectedTab}
        onSelectTab={(tab) => setSelectedTab(tab as CategoryKey)}
        onSearch={(query) => setSearchValue(query)}
      />

      {!filteredClasses.length ? (
        <s.EmptyMessage>참여한 학습실이 없습니다.</s.EmptyMessage>
      ) : (
        <s.Grid>
          {filteredClasses.map((cls, idx) => (
            <s.Card
              key={cls.id || `myclass-${idx}`}
              onClick={() => handleViewClass(cls.id)}
              style={{ cursor: 'pointer' }}
            >
              <s.CardTitle>{cls.name}</s.CardTitle>
              <s.CardDescription>{cls.description || '설명이 없습니다.'}</s.CardDescription>
              <s.InfoBlock>
                <s.InfoContent>
                  {cls.subject || '미정'} | {cls.assignedClass || '미정'}
                </s.InfoContent>
              </s.InfoBlock>
            </s.Card>
          ))}
        </s.Grid>
      )}
    </s.Container>
  );
}