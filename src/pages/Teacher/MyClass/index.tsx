import * as s from './styles';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Customapi from '@/shared/config/api';

export default function MyClass() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [myClasses, setMyClasses] = useState<any[]>([]);

  // 내 전체 학습실 조회
  const MyClass = async () => {
    try {
      const res = await Customapi.get('/api/class'); 
      if (res.status !== 200) {
        setError(`학습실 조회 실패: 상태 코드 ${res.status}`);
        return;
      }

      setMyClasses(res.data); // 그대로 state에 저장
    } catch (err: any) {
      console.error('학습실 조회 실패: ', err);
      setError(err.response?.data?.message || '내 학습실 불러오기 실패');
    }
  };

  useEffect(() => {
    MyClass();
  }, []);

  return (
    <s.Container>
      <s.Flexible>
        <s.TitleFont>나의 학습실</s.TitleFont>
        <s.AddButton onClick={() => navigate('/class/make')}>학습실 추가</s.AddButton>
        {error && <s.ErrorMessage>{error}</s.ErrorMessage>}
      </s.Flexible>

      {myClasses.length === 0 ? (
        <p>만든 학습실이 없습니다.</p>
      ) : (
        myClasses.map((cls, idx) => (
          <div key={idx}>{cls.name || '알 수 없는 학습실'}</div>
        ))
      )}
    </s.Container>
  );
}