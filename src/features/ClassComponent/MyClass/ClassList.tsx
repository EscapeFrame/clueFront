import React, { useState } from "react";
import styles from '@/shared/css/Class/MyClass/ClassList.module.css';

import Navbar from "@/widgets/Navbar";
import { useNavigate } from "react-router-dom";
import { CategoryTabs } from "./CategoryTabs";
import { ClassCard } from "./ClassCard";
import { Posts } from '@/shared/theme/MyClassTheme';

type CategoryKey = '전체' | '인문과목' | '전공과목' | '방과후';

interface Post {
    classId: string;
    title: string;
    subject: string;
    classRoom: string;
    people: number;
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

    const navigate = useNavigate();

    const filteredByCategory: Post[] =
        selectCategory === '전체'
            ? Posts
            : Posts.filter((post: Post) => post.category === categoryMap[selectCategory]);

    const filteredPosts: Post[] = filteredByCategory.filter((post: Post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
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

            <div className={styles.CardContainer}>
                {filteredPosts.map((post: Post) => (
                    <div
                        key={post.classId}
                        onClick={() => handleCardClick(post.classId)}
                        style={{ cursor: 'pointer' }}
                    >
                        <ClassCard
                            classId={post.classId}
                            title={post.title}
                            subject={post.subject}
                            classRoom={post.classRoom}
                            people={post.people}
                            category={post.category}
                        />
                    </div>
                ))}
            </div>
        </>
    );
};
