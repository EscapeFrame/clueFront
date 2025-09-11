import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Customapi from '@/shared/config/api';

// 유저 타입
interface RegisterData {
  username: string;
  email: string;
  classCode: string;
  role: string;
}

function RegisterPage() {
  const [registerData, setRegisterData] = useState<RegisterData | null>(null);
  const [loadingRegisterInfo, setLoadingRegisterInfo] = useState(true);
  const navigate = useNavigate();

  // 역할 정규화
  const normalizeRole = (r: string): 'STUDENT' | 'TEACHER' =>
  r === 'TCH' || r === 'TEACHER' ? 'TEACHER' : 'STUDENT';

  useEffect(() => {
    // 첫 로그인일 때 요청
    if (window.location.pathname === '/register') {
      Customapi.get('/first-register')
        .then((res) => {
          const data = res.data;
          setRegisterData({
            username: data.username,
            email: data.email,
            classCode: '',
            role: normalizeRole(data.role),
          });
          console.log("data:",data);
        })
        .finally(() => setLoadingRegisterInfo(false));
    } else {
      setLoadingRegisterInfo(false);
    }
  }, [navigate]);

  //신규 사용자의 폼
  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('registerData:', registerData);
    // 데이터가 없으면 리턴
    if (!registerData) return;


    try {
      const payload = {
        ...registerData,
        classCode: registerData.classCode.trim(),
      };
      await Customapi.post('/register', JSON.stringify(payload));
      alert('회원가입 완료! 메인 페이지로 이동합니다.');
      navigate('/');
    } catch (err) {
      console.error('회원가입 실패:', err);
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value  = e.target.value;
    if (registerData) {
      setRegisterData({ ...registerData, classCode: value });
    }
  };

  if (loadingRegisterInfo) {
    return <div>정보를 불러오는 중...</div>;
  }

  if (registerData && registerData.role === 'TEACHER') {
    alert('로그인이 완료 되었습니다. 메인페이지로 이동합니다.');
    navigate('/');
    return null;
  }

  return (
    // 디자인 나오기 전 임시
    <div>
      <h2>추가 정보 입력</h2>
      {registerData && (
        <form onSubmit={handleRegisterSubmit}>
          <div>
            <label htmlFor="classCode">학번:</label>
            <input
              id="classCode"
              name="classCode"
              value={registerData.classCode}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">
            회원가입 완료
          </button>
        </form>
      )}
    </div>
  );
}

export default RegisterPage;