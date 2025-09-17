import { useState } from 'react';
import * as s from './styles';

type SearchProps = {
  onSearch: (query: string) => void;
};

export function SearchBar({ onSearch }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
    console.log("검색어:", query);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <s.Container>
      <s.SearchField
        type="text"
        placeholder="찾으시는 학습실을 입력해주세요."
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <s.SearchIcon size={20} onClick={handleSearch} />
    </s.Container>
  );
}