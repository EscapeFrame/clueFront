import React, { useState } from 'react';
import styles from '@/shared/css/Search.module.css';
import { IoSearch } from "react-icons/io5";

type SearchInputProps = {
  onSearch: (query: string) => void;
};

export function SearchInput({ onSearch }: SearchInputProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
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
    <div className={styles.Search}>
      <input
        type="text"
        placeholder="찾으시는 학습실을 입력해주세요."
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        className={styles.SearchInput}
      />
      <IoSearch
        className={styles.SearchIcon}
        size={20}
        onClick={handleSearch}
        style={{ cursor: 'pointer' }}
      />
    </div>
  );
}