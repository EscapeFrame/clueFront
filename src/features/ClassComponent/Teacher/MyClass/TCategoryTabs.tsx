import React from 'react';
import { Container, TabList, TabButton } from '@/features/ClassComponent/MyClass/CategoryTabs/styles';
import { SearchInput } from '@/widgets/Search/Search';
import { Setting } from '@/widgets/Setting/Setting';

type TCategoryKey = '전체' | '활성화' | '비활성화';

interface TCategoryTabsProps {
  selected: TCategoryKey;
  onSelect: (category: TCategoryKey) => void;
  onSearch: (query: string) => void;
}

export const TCategoryTabs: React.FC<TCategoryTabsProps> = ({
  selected,
  onSelect,
  onSearch,
}) => {
  const categories: TCategoryKey[] = ['전체', '활성화', '비활성화'];

  return (
    <Container>
      <TabList>
        {categories.map(category => (
          <TabButton
            key={category}
            isActive={selected === category}
            onClick={() => onSelect(category)}
          >
            {category}
          </TabButton>
        ))}
      </TabList>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <SearchInput onSearch={onSearch} />
        <Setting />
      </div>
    </Container>
  );
};