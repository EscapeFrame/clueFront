import * as s from './styles';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import TabSelector from '@/features/Common/Class/TabSelector';
import { CategoryKey, CATEGORY_FILTER_MAP, getCategoryLabel } from '@/features/Common/Class/TabSelector/category';

import { useMyClass } from '@/features/Common/MyClass/hooks/useMyClass';
import { FiPlus } from "react-icons/fi";
import { IoBookOutline } from "react-icons/io5";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { FaRegClock } from "react-icons/fa6";

export default function MyClass() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isAIFlowMode = searchParams.get('mode') === 'ai-flow';
  const { myClasses, error, loading } = useMyClass();
  const [selectedTab, setSelectedTab] = useState<CategoryKey>('전체');
  const [searchValue, setSearchValue] = useState('');

  // 필터 로직
  const filteredClasses = myClasses.filter((cls) => {
    const filterValue = CATEGORY_FILTER_MAP[selectedTab as CategoryKey];
    const tabMatch = filterValue === null ? true : cls.sort === filterValue;
    const searchMatch = cls.name.toLowerCase().includes(searchValue.toLowerCase());
    return tabMatch && searchMatch;
  });

  const handleViewClass = (id: string | number) => {
    if (isAIFlowMode) {
      navigate(`/class/${id}?mode=ai-flow`);
    } else {
      navigate(`/class/${id}`);
    }
  };

  const getIconByCategory = (categoryKey: string) => {
    switch (categoryKey) {
      case 'GENERAL':
        return <IoBookOutline />;
      case 'MAJOR':
        return <HiOutlineAcademicCap />;
      case 'AFTER':
        return <FaRegClock />;
      default:
        return null;
    }
  };

  return (
    <s.Container>
      {/* AI Flow 모드 배너 */}
      {isAIFlowMode && (
        <s.AIFlowBanner>
          <s.BannerContent>
            <s.BannerTitle>AI 수업 생성 모드</s.BannerTitle>
            <s.BannerDescription>
              학습실을 선택한 후, 디렉토리의 + 버튼을 눌러 AI로 자료를 생성하세요
            </s.BannerDescription>
          </s.BannerContent>
        </s.AIFlowBanner>
      )}

      <s.HeaderSection>
        <s.HeaderContent>
          <s.TitleFont>나의 학습실</s.TitleFont>
          <s.AddButton onClick={() => navigate('/class/make')}>
            <FiPlus />&nbsp; 학습실 추가
          </s.AddButton>
        </s.HeaderContent>

        {error && <s.ErrorMessage>{error}</s.ErrorMessage>}

        <TabSelector
          selectedTab={selectedTab}
          onSelectTab={(tab) => setSelectedTab(tab as CategoryKey)}
          onSearch={(query) => setSearchValue(query)}
        />
      </s.HeaderSection>

      <s.CardArea>
        {loading ? (
          // render skeletons while loading
          <s.Grid>
            {Array.from({ length: 6 }).map((_, i) => (
              <s.Card key={`skeleton-${i}`}>
                <s.CardHeader>
                  <s.IconWrapper>
                    <div style={{ width: 28, height: 28, borderRadius: 6, background: '#e9ecef' }} />
                  </s.IconWrapper>
                  <s.CardTitle>
                    <div style={{ width: 180, height: 18, borderRadius: 6, background: '#e9ecef' }} />
                  </s.CardTitle>
                </s.CardHeader>

                <s.InfoContent>
                  <div style={{ width: 140, height: 14, borderRadius: 6, background: '#f1f3f5' }} />
                </s.InfoContent>

                <s.CardDescription>
                  <div style={{ width: '100%', height: 12, borderRadius: 6, background: '#f1f3f5', marginBottom: 6 }} />
                  <div style={{ width: '80%', height: 12, borderRadius: 6, background: '#f1f3f5' }} />
                </s.CardDescription>
              </s.Card>
            ))}
          </s.Grid>
        ) : (!filteredClasses.length ? (
          <s.EmptyMessage>참여한 학습실이 없습니다.</s.EmptyMessage>
        ) : (
          <s.Grid>
            {filteredClasses.map((cls, idx) => (
              <s.Card key={cls.classRoomId || `myclass-${idx}`} onClick={() => handleViewClass(cls.classRoomId)}>
                <s.CardHeader>
                  <s.IconWrapper>{getIconByCategory(cls.sort)}</s.IconWrapper>
                  <s.CardTitle>{cls.name}</s.CardTitle>
                </s.CardHeader>

                <s.InfoContent>
                  {getCategoryLabel(cls.sort) || '-'} | {cls.target || '-'}
                </s.InfoContent>

                <s.CardDescription>{cls.description}</s.CardDescription>
              </s.Card>
            ))}
          </s.Grid>
        ))}
      </s.CardArea>
    </s.Container>
  );
}