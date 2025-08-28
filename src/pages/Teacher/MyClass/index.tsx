import * as s from './styles';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useMyClass } from '@/features/Common/Class/hooks/useMyClass';
import TabSelector, { CategoryKey } from '@/features/Common/Class/TabSelector';
import { ClassResponse } from '@/shared/types/class/class';
import { ClassCard } from '@/entities/Class/ClassCard';

export default function MyClass() {
  const navigate = useNavigate();
  const { myClasses, error } = useMyClass();

  const [selectedTab, setSelectedTab] = useState<CategoryKey>('전체');
  const [searchValue, setSearchValue] = useState('');

  const filteredClasses = myClasses.filter((cls: ClassResponse) => {
    const tabMatch = selectedTab === '전체' || cls.sort?.includes(selectedTab);
    const searchMatch = cls.classRoomName.toLowerCase().includes(searchValue.toLowerCase());
    return tabMatch && searchMatch;
  });

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
        onSearch={setSearchValue}
      />

      {!filteredClasses.length ? (
        <s.EmptyMessage>만든 학습실이 없습니다.</s.EmptyMessage>
      ) : (
        <s.Grid>
          {filteredClasses.map((cls: ClassResponse) => (
            <ClassCard
              key={cls.classRoomId}
              classRoomId={cls.classRoomId}
              name={cls.classRoomName}
              sort={cls.sort || '미정'}
              target={cls.teacherNames?.join(', ') || '미정'}
            />
          ))}
        </s.Grid>
      )}
    </s.Container>
  );
}