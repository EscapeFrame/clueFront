import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TCategoryTabs } from './TCategoryTabs';
import { TClassCard } from './TClassCard';
import TCustomapi from '@/shared/api/Taxios';
import { CardGrid } from './styles';

type TCategoryKey = '전체' | '활성화' | '비활성화';

interface TPost {
  classRoomId: string;
  name: string;
  sort: string;
  target: string;
  studentCount: number;
  isActivation: number;
}

const TcategoryMap: Record<TCategoryKey, number> = {
  전체: 0,
  활성화: 1,
  비활성화: 2,
};

export const TClassList: React.FC = () => {
  const [selectCategory, setSelectedCategory] = useState<TCategoryKey>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [posts, setPosts] = useState<TPost[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    TCustomapi.get('/api/class')
      .then(res => {
        setPosts(res.data);
        console.log(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const filteredByCategory: TPost[] =
    selectCategory === '전체'
      ? posts
      : posts.filter((post: TPost) => post.isActivation === TcategoryMap[selectCategory]);

  const filteredPosts: TPost[] = filteredByCategory.filter((post: TPost) =>
    post.name.toLowerCase().includes(searchQuery.toLowerCase())
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
          <TClassCard key={post.classRoomId} {...post} />
        ))}
      </CardGrid>
    </>
  );
};