import * as s from './styles';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Customapi from '@/shared/config/api';
import TabSelector, { CategoryKey } from '@/features/Common/Class/TabSelector';
import Button from '@/entities/UI/Button';

// ✅ 학습실 타입 정의
interface Classroom {
  classRoomId: number;
  classRoomName: string;
  description: string;
  directoryList: string[];
  teacherNames: string[];
  subject?: string;           // 임시로 추가
  assignedClass?: string;     // 임시로 추가
}

export default function MyClass() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [myClasses, setMyClasses] = useState<Classroom[]>([]);

  const [selectedTab, setSelectedTab] = useState<CategoryKey>('전체');
  const [searchValue, setSearchValue] = useState('');

  // 내 전체 학습실 조회
  const fetchMyClasses = async () => {
    try {
      const res = await Customapi.get(`/api/class`);
      if (res.status !== 200) {
        setError(`학습실 조회 실패: 상태 코드 ${res.status}`);
        return;
      }
      setMyClasses(Array.isArray(res.data) ? res.data : []);
    } catch (err: any) {
      console.error('학습실 조회 실패: ', err);
      setError(err.response?.data?.message || '내 학습실 불러오기 실패');
    }
  };

  useEffect(() => {
    fetchMyClasses();
  }, []);

  // 🔹 탭 선택과 검색어 기반 필터링
  const filteredClasses = myClasses.filter((cls) => {
    const tabMatch =
      selectedTab === '전체' ? true : cls.subject?.includes(selectedTab);
    const searchMatch = cls.classRoomName
      .toLowerCase()
      .includes(searchValue.toLowerCase());
    return tabMatch && searchMatch;
  });

  // 학습실 관리 페이지로 이동
  const handleManageClass = (classId: number) => {
    navigate(`/class/setting/${classId}`);
  };

  // 학습실 상세보기 페이지로 이동  
  const handleViewClass = (classId: number) => {
    navigate(`/class/${classId}`);
  };

  return (
    <s.Container>
      <s.Flexible>
        <s.TitleFont>나의 학습실</s.TitleFont>
        <s.AddButton onClick={() => navigate('/class/make')}>학습실 추가</s.AddButton>
        {error && <s.ErrorMessage>{error}</s.ErrorMessage>}
      </s.Flexible>

      <TabSelector
        selectedTab={selectedTab}
        onSelectTab={(tab) => setSelectedTab(tab as CategoryKey)}
        onSearch={(query: string) => setSearchValue(query)}
      />

      {!filteredClasses.length ? (
        <s.EmptyMessage>만든 학습실이 없습니다.</s.EmptyMessage>
      ) : (
        <s.Grid>
          {filteredClasses.map((cls: Classroom) => (
            <s.Card key={cls.classRoomId}>
              <s.CardTitle>{cls.classRoomName}</s.CardTitle>
              <s.CardDescription>{cls.description}</s.CardDescription>
              <s.InfoBlock>
                <s.InfoContent>
                  {cls.subject || '미정'} | {cls.assignedClass || '미정'}
                </s.InfoContent>
              </s.InfoBlock>
              <s.ButtonGroup>
                <Button text='관리' width="50%" type={1} onClick={() => handleManageClass(cls.classRoomId)} />
                <Button text='학습실 보기' width="50%" type={0} onClick={() => handleViewClass(cls.classRoomId)} />
              </s.ButtonGroup>
            </s.Card>
          ))}
        </s.Grid>
      )}
    </s.Container>
  );
}