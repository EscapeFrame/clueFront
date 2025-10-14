import { useState, useRef } from 'react';
import type { ChangeEvent, CompositionEvent } from 'react';
import * as s from './styles';

type SearchProps = {
  onSearch: (query: string) => void;
};

export function SearchBar({ onSearch }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const isComposingRef = useRef(false);
  const lastQueryRef = useRef('');

  const doSearch = (q: string) => {
    const query = q.trim();
    if (query === lastQueryRef.current) return;
    lastQueryRef.current = query;
    onSearch(query);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setSearchQuery(q);
    if (isComposingRef.current) return;
    doSearch(q);
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
        placeholder="검색할 내용을 입력하세요."
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onCompositionStart={() => { isComposingRef.current = true; }}
        onCompositionEnd={(e: CompositionEvent<HTMLInputElement>) => {
          isComposingRef.current = false;
          doSearch((e.target as HTMLInputElement).value);
        }}
      />
      <s.SearchIcon size={20} onClick={handleSearch} />
    </s.Container>
  );
}

export default SearchBar;