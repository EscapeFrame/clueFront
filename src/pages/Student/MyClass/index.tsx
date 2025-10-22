import * as s from './styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TabSelector from '@/features/Common/Class/TabSelector';
import { CategoryKey, CATEGORY_FILTER_MAP } from '@/features/Common/Class/TabSelector/category';
import { useModal } from '@/entities/UI/Modal/modal.hooks';
import { Modal } from '@/entities/UI/Modal';

import { useMyClass } from './data';
import { FiPlus } from "react-icons/fi";
import { IoBookOutline } from "react-icons/io5";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { FaRegClock } from "react-icons/fa6";

export default function MyClass() {
  const navigate = useNavigate();
  const { myClasses, error, setCategoryFilter, addClassroom } = useMyClass();
  const [selectedTab, setSelectedTab] = useState<CategoryKey>('전체');
  const [searchValue, setSearchValue] = useState('');
  const { isOpen, openModal, closeModal } = useModal();
  const [code, setCode] = useState('');

  // 탭 + 검색 필터링
  const filteredClasses = myClasses.filter((cls) => {
    const filterValue = CATEGORY_FILTER_MAP[selectedTab as CategoryKey];
    const tabMatch = filterValue === null ? true : cls.categoryKey === filterValue;
    const searchMatch = cls.name.toLowerCase().includes(searchValue.toLowerCase());
    return tabMatch && searchMatch;
  });

  const handleViewClass = (id: string | number) => navigate(`/class/${id}`);

  const handleJoinClass = async () => {
    const trimmed = code.trim();
    if (!trimmed) return;
    const ok = await addClassroom(trimmed);
    if (ok) {
      setCode('');
      closeModal();
    }
  };

  const getIconByCategory = (categoryKey: string) => {
    switch (categoryKey) {
      case 'sort':
        return <IoBookOutline />;
      case 'professional':
        return <HiOutlineAcademicCap />;
      case 'afterSchool':
        return <FaRegClock />;
      default:
        return null;
    }
  };

  return (
    <s.Container>
      <s.HeaderSection>
        <s.HeaderContent>
          <s.TitleFont>나의 학습실</s.TitleFont>
          <s.AddButton onClick={openModal}>
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
        {!filteredClasses.length ? (
          <s.EmptyMessage>참여한 학습실이 없습니다.</s.EmptyMessage>
        ) : (
          <s.Grid>
            {filteredClasses.map((cls, idx) => (
              <s.Card key={cls.classRoomId || `myclass-${idx}`} onClick={() => handleViewClass(cls.classRoomId)}>
                <s.CardHeader>
                  <s.IconWrapper>{getIconByCategory(cls.categoryKey)}</s.IconWrapper>
                  <s.CardTitle>{cls.name}</s.CardTitle>
                </s.CardHeader>
                <s.InfoContent>
                  {cls.categoryKey || '-'} | {cls.assignedClass || '-'}
                </s.InfoContent>
                <s.CardDescription>{cls.description || '설명이 없습니다.'}</s.CardDescription>
              </s.Card>
            ))}
          </s.Grid>
        )}
      </s.CardArea>

      {isOpen && (
        <Modal
          title="학습실 추가"
          onClose={closeModal}
          buttons={[
            { text: '취소', onClick: closeModal },
            { text: '확인', onClick: handleJoinClass },
          ]}
        >
          <s.AddModalInput
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="학습실 코드를 입력하세요"
          />
        </Modal>
      )}
    </s.Container>
  );
}