import * as s from './styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TabSelector from '@/features/Common/Class/TabSelector';
import { CategoryKey, CATEGORY_FILTER_MAP } from '@/features/Common/Class/TabSelector/category';
import { useMyClass } from '@/features/Common/MyClass/hooks/useMyClass';
import { useModal } from '@/entities/UI/Modal/modal.hooks';
import { Modal } from '@/entities/UI/Modal';

export default function MyClass() {
  const navigate = useNavigate();
  const { myClasses, error, joinClassroom } = useMyClass();
  const [selectedTab, setSelectedTab] = useState<CategoryKey>('전체');
  const [searchValue, setSearchValue] = useState('');
  const { isOpen, openModal, closeModal } = useModal();
  const [code, setCode] = useState('');

  // 탭 + 검색 필터링
  const filteredClasses = myClasses.filter((cls) => {
    const filterValue = CATEGORY_FILTER_MAP[selectedTab as CategoryKey];
    const tabMatch = filterValue === null ? true : cls.sort === filterValue;
    const searchMatch = cls.name.toLowerCase().includes(searchValue.toLowerCase());
    return tabMatch && searchMatch;
  });

  const handleViewClass = (id: string | number) => navigate(`/class/${id}`);

  const handleJoinClass = async () => {
    const trimmed = code.trim();
    if (!trimmed) return;
    const ok = await joinClassroom(trimmed);
    if (ok) {
      setCode('');
      closeModal();
    }
  };

  return (
    <s.Container>
      <s.Flexible>
        <s.TitleFont>나의 학습실</s.TitleFont>
        <s.AddButton onClick={openModal}>학습실 추가</s.AddButton>
        {error && <s.ErrorMessage>{error}</s.ErrorMessage>}
      </s.Flexible>

      <TabSelector
        selectedTab={selectedTab}
        onSelectTab={(tab) => setSelectedTab(tab as CategoryKey)}
        onSearch={(query) => setSearchValue(query)}
      />

      {!filteredClasses.length ? (
        <s.EmptyMessage>참여한 학습실이 없습니다.</s.EmptyMessage>
      ) : (
        <s.Grid>
          {filteredClasses.map((cls, idx) => (
            <s.Card
              key={cls.classRoomId || `myclass-${idx}`}
              onClick={() => handleViewClass(cls.classRoomId)}
            >
              <s.CardTitle>{cls.name}</s.CardTitle>
              <s.CardDescription>{cls.description || '설명이 없습니다.'}</s.CardDescription>
              <s.InfoBlock>
                <s.InfoContent>
                  {cls.sort || '미정'} | {cls.assignedClass || '미정'}
                </s.InfoContent>
              </s.InfoBlock>
            </s.Card>
          ))}
        </s.Grid>
      )}

      {isOpen && (
        <Modal
          title="학습실 추가"
          onClose={closeModal}
          buttons={[
            { text: '취소', onClick: closeModal },
            { text: '확인', onClick: () => { handleJoinClass(); } },
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