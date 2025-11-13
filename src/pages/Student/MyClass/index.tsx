import * as s from './styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TabSelector from '@/features/Common/Class/TabSelector';
import { CategoryKey, CATEGORY_FILTER_MAP } from '@/features/Common/Class/TabSelector/category';
import { useModal } from '@/entities/UI/Modal/modal.hooks';
import { Modal } from '@/entities/UI/Modal';
import { useMyClass } from '@/features/Common/MyClass/hooks/useMyClass';
import { FiPlus } from "react-icons/fi";
import { IoBookOutline } from "react-icons/io5";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { FaRegClock } from "react-icons/fa6";

export default function MyClass() {
  const navigate = useNavigate();
  const { myClasses, error, joinClassroom } = useMyClass();
  const [selectedTab, setSelectedTab] = useState<CategoryKey>('전체');
  const [searchValue, setSearchValue] = useState('');
  const { isOpen, openModal, closeModal } = useModal();
  const [code, setCode] = useState('');
  const [modalError, setModalError] = useState<string | null>(null); // 모달 전용 에러 상태

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
    if (!trimmed) {
      setModalError('학습실 코드를 입력해주세요.');
      return;
    }

    const ok = await joinClassroom(trimmed);
    if (ok) {
      setCode('');
      setModalError(null);
      closeModal();
    } else {
      setModalError('학습실 추가에 실패했습니다. 코드를 확인해주세요.');
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
                  {cls.sort || '-'} | {cls.target || '-'}
                </s.InfoContent>
                <s.CardDescription>{cls.description}</s.CardDescription>
              </s.Card>
            ))}
          </s.Grid>
        )}
      </s.CardArea>

      {isOpen && (
        <Modal
          title="학습실 추가"
          onClose={() => {
            setModalError(null);
            closeModal();
          }}
          buttons={[
            { text: '취소', type:2, width:"50%", onClick: closeModal },
            { text: '확인', type:0, width:"50%", onClick: handleJoinClass },
          ]}
        >
          <s.AddModalInput
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="학습실 코드를 입력하세요"
          />

          {modalError && <s.ErrorMessage>{modalError}</s.ErrorMessage>}
        </Modal>
      )}
    </s.Container>
  );
}