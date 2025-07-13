import { useState } from 'react';
import { SearchWrapper, SearchField, SearchIcon } from '@/widgets/Search/styles';

type SearchInputProps = {
  onSearch: (query: string) => void;
};

export function SearchInput({ onSearch }: SearchInputProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => onSearch(searchQuery);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <SearchWrapper>
      <SearchField
        type="text"
        placeholder="찾으시는 학습실을 입력해주세요."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <SearchIcon size={20} onClick={handleSearch} />
    </SearchWrapper>
  );
}