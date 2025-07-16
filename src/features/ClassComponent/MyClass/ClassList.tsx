import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryTabs } from "@/features/ClassComponent/MyClass/CategoryTabs/CategoryTabs";
import { ClassCard } from "./ClassCard";
import Customapi from '@/shared/api/axios';
import * as S from './styles';

type CategoryKey = '전체' | '인문과목' | '전공과목' | '방과후';

export interface Post {
  classRoomId: string;
  name: string;
  description: string;
  sort: string;
  target: string;
  studentCount: number;
  isActivation: boolean;
  createdAt: Date;
  category: number; 
}

const categoryMap: Record<CategoryKey, number> = {
  전체: 0,
  인문과목: 1,
  전공과목: 2,
  방과후: 3,
};

export const ClassList: React.FC = () => {
  const [selectCategory, setSelectedCategory] = useState<CategoryKey>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [posts, setPosts] = useState<Post[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    Customapi.get('/api/class')
      .then(res => {
        console.log("API 응답:", res.data); // 이걸 꼭 확인하세요
  
        if (!Array.isArray(res.data)) {
          console.error("API 응답이 배열이 아님:", res.data);
          return;
        }
  
        const formattedPosts = res.data.map((post: any) => ({
          ...post,
          classRoomId: String(post.classRoomId),
          createdAt: new Date(post.createdAt),
          category: Number(post.category),
        }));
  
        setPosts(formattedPosts);
      })
      .catch(err => {
        console.error('클래스 목록 불러오기 실패:', err);
      });
  }, []);

  const filteredByCategory: Post[] =
    selectCategory === '전체'
      ? posts
      : posts.filter((post) => post.category === categoryMap[selectCategory]);

  const filteredPosts: Post[] = filteredByCategory.filter((post: Post) =>
    post.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCardClick = (classId: string | number): void => {
    navigate(`/class/${classId}`);
  };

  return (
    <>
      <CategoryTabs
        selected={selectCategory}
        onSelect={setSelectedCategory}
        onSearch={setSearchQuery}
      />

      <S.CardContainer>
        {filteredPosts.map((post: Post) => (
          <div
            key={post.classRoomId}
            onClick={() => handleCardClick(post.classRoomId)}
            style={{ cursor: 'pointer' }}
          >
            <ClassCard
              classRoomId={post.classRoomId}
              name={post.name}
              description={post.description}
              sort={post.sort}
              target={post.target}
              studentCount={post.studentCount}
              isActivation={post.isActivation}
              createdAt={post.createdAt}
              category={post.category}
            /> 
          </div>
        ))}
      </S.CardContainer>
    </>
  );
};