import { useState } from 'react';
import * as s from './styles';

type SearchProps = {
  onSearch: (query: string) => void;
};

export function SearchBar({ onSearch }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => onSearch(searchQuery);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <s.Container>
      <s.SearchField
        type="text"
        placeholder="찾으시는 학습실을 입력해주세요."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <s.SearchIcon size={20} onClick={handleSearch} />
    </s.Container>
  );
}