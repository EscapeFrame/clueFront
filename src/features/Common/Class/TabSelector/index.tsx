import { SearchBar } from '@/entities/UI/SearchBar';
import * as s from './styles';
import { CategoryKey } from './category';
import { IconType } from 'react-icons';
import { IoBookOutline } from 'react-icons/io5';
import { HiOutlineAcademicCap } from 'react-icons/hi2';
import { CiClock2 } from 'react-icons/ci';

type TabSelectorProps = {
  selectedTab: CategoryKey;
  onSelectTab: (tab: CategoryKey) => void;
  onSearch?: (query: string) => void; // SearchBar용 옵셔널 함수
};

export default function TabSelector({ selectedTab, onSelectTab, onSearch }: TabSelectorProps) {
  // categoryData 포맷을 linksave 예시와 동일하게 맞춤 (아이콘은 현재 없음)
  // LinkSave의 categoryData 구조와 동일하게 아이콘을 매핑
  const categoryData: { name: CategoryKey; icon?: IconType }[] = [
    { name: '전체' },
    { name: '일반과목', icon: IoBookOutline },
    { name: '전공과목', icon: HiOutlineAcademicCap },
    { name: '방과후', icon: CiClock2 },
  ];

  return (
    <s.Container>
      <s.ItemContainer>
        {categoryData.map((item) => {
          const Icon: IconType | undefined = item.icon;
          return (
            <li key={item.name}>
              <s.Item
                onClick={() => onSelectTab(item.name)}
                className={selectedTab === item.name ? 'active' : ''}
              >
                {Icon && <Icon size={18} style={{ marginRight: '6px' }} />}
                {item.name}
              </s.Item>
            </li>
          );
        })}
      </s.ItemContainer>
      <s.SearchContainer>
        {onSearch && <SearchBar onSearch={onSearch} />}
      </s.SearchContainer>
    </s.Container>
  );
};