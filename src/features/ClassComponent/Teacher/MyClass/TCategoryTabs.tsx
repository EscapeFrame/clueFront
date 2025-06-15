import styles from '@/shared/css/Class/MyClass/CategoryTab.module.css';
import { SearchInput } from '@/widgets/Search';
import { Setting } from '@/widgets/Setting';

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
    <div className={styles.CategoryTabs}>
      <div>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`${styles.TabButton} ${selected === category ? styles.Active : ''}`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className={styles.flex}>
        <SearchInput onSearch={onSearch} />
        <Setting />
      </div>
    </div>
  );
};