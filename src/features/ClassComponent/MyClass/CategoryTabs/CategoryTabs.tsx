/** @jsxImportSource @emotion/react */
import { SearchInput } from '@/widgets/Search/Search';
import { Container, TabList, TabButton } from './styles';

type CategoryKey = '전체' | '인문과목' | '전공과목' | '방과후';

interface CategoryTabsProps {
  selected: CategoryKey;
  onSelect: (category: CategoryKey) => void;
  onSearch: (query: string) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  selected,
  onSelect,
  onSearch,
}) => {
  const categories: CategoryKey[] = ['전체', '인문과목', '전공과목', '방과후'];

  return (
    <Container>
      <TabList>
        {categories.map((category) => (
          <TabButton
            key={category}
            isActive={selected === category}
            onClick={() => onSelect(category)}
          >
            {category}
          </TabButton>
        ))}
      </TabList>
      <SearchInput onSearch={onSearch} />
    </Container>
  );
};