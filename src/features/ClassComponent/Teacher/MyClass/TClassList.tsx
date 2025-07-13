import React, { useState } from "react";
import { TCategoryTabs } from "./TCategoryTabs";
import TClassCard from "./TClassCard";
import { TPosts, type TPost } from '@/shared/theme/Teacher/MyClassTheme';
import * as S from '@/features/ClassComponent/MyClass/styles';

type TCategoryKey = '전체' | '활성화' | '비활성화';

const TcategoryMap: Record<TCategoryKey, number> = {
  전체: 0,
  활성화: 1,
  비활성화: 2,
};

export const TClassList: React.FC = () => {
  const [selectCategory, setSelectedCategory] = useState<TCategoryKey>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredByCategory: TPost[] =
    selectCategory === '전체'
      ? TPosts
      : TPosts.filter((post) => post.status === TcategoryMap[selectCategory]);

  const filteredPosts: TPost[] = filteredByCategory.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <TCategoryTabs
        selected={selectCategory}
        onSelect={setSelectedCategory}
        onSearch={setSearchQuery}
      />

      <S.CardContainer>
        {filteredPosts.map((post) => (
          <TClassCard key={post.classId} {...post} />
        ))}
      </S.CardContainer>
    </>
  );
};