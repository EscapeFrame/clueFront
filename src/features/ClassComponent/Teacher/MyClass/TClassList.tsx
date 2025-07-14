import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TCategoryTabs } from './TCategoryTabs';
import { TClassCard } from './TClassCard';
import { TPosts } from '@/shared/theme/Teacher/MyClassTheme';
import { CardGrid } from './styles';

type TCategoryKey = '전체' | '활성화' | '비활성화';

interface TPost {
  classId: string;
  title: string;
  subject: string;
  classRoom: string;
  people: number;
  status: number;
}

const TcategoryMap: Record<TCategoryKey, number> = {
  전체: 0,
  활성화: 1,
  비활성화: 2,
};

export const TClassList: React.FC = () => {
  const [selectCategory, setSelectedCategory] = useState<TCategoryKey>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const navigate = useNavigate();

  const filteredByCategory: TPost[] =
    selectCategory === '전체'
      ? TPosts
      : TPosts.filter((post: TPost) => post.status === TcategoryMap[selectCategory]);

  const filteredPosts: TPost[] = filteredByCategory.filter((post: TPost) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <TCategoryTabs
        selected={selectCategory}
        onSelect={setSelectedCategory}
        onSearch={setSearchQuery}
      />

      <CardGrid>
        {filteredPosts.map((post: TPost) => (
          <TClassCard key={post.classId} {...post} />
        ))}
      </CardGrid>
    </>
  );
};