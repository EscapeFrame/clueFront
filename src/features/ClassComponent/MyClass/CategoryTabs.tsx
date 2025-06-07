import styles from '@/shared/css/Class/MyClass/CategoryTab.module.css';
import { SearchInput } from '@/widgets/Search';

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
      <SearchInput onSearch={onSearch} />
    </div>
  );
};