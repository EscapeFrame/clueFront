import { SearchBar } from '@/entities/UI/SearchBar';
import * as s from './styles';

export type CategoryKey = '전체' | '인문과목' | '전공과목';

export const CATEGORY_MAP: Record<CategoryKey, number> = {
  '전체': -1,
  '인문과목': 1,
  '전공과목': 2,
};

type TabSelectorProps = {
  selectedTab: string;
  onSelectTab: (tab: string) => void;
  onSearch?: (query: string) => void;  // SearchBar용 옵셔널 함수
};

export default function TabSelector({ selectedTab, onSelectTab, onSearch }: TabSelectorProps) {
  return (
    <s.Container>
      <s.TabList>
        {Object.keys(CATEGORY_MAP).map(key => (
          <s.TabButton
            key={key}
            isActive={selectedTab === key} 
            onClick={() => onSelectTab(key)}  
          >
            {key}
          </s.TabButton>
        ))}
      </s.TabList>
      {onSearch && <SearchBar onSearch={onSearch} />}   {/* onSearch가 있을 때만 렌더링 */}
    </s.Container>
  );
};