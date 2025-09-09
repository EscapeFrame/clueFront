import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Customapi from '@/shared/config/api';

// 유저 타입
interface RegisterData {
  username: string;
  email: string;
  studentId: string;
  role: string;
}

function RegisterPage() {
  const [registerData, setRegisterData] = useState<RegisterData | null>(null);
  const [isRegistrationMode, setIsRegistrationMode] = useState(false);
  const [loadingRegisterInfo, setLoadingRegisterInfo] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // 첫 로그인일 때 요청
    if (window.location.pathname === '/register') {
      Customapi.get('/first-register')
        .then((res) => {
          const data = res.data;
          setRegisterData({
            username: data.username,
            email: data.email,
            studentId: '',
            role: data.role,
          });
          setIsRegistrationMode(true);
        })
        .catch(() => {
          setIsRegistrationMode(false);
          // 첫 로그인이 아니면 메인으로 이동
        })
        .finally(() => setLoadingRegisterInfo(false));
    } else {
      setLoadingRegisterInfo(false);
    }
  }, [navigate]);

  //신규 사용자의 폼
  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 데이터가 없으면 리턴
    if (!registerData) return;

    try {
      const payload = {
        ...registerData,
        studentId: Number(registerData.studentId),
      };
      await Customapi.post('/register', payload);
      alert('회원가입 완료! 메인 페이지로 이동합니다.');
      navigate('/');
    } catch (err) {
      console.error('회원가입 실패:', err);
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (registerData) {
      setRegisterData({ ...registerData, studentId: value });
    }
  };

  if (loadingRegisterInfo) {
    return <div>정보를 불러오는 중...</div>;
  }

  if (!isRegistrationMode) {
    alert('이미 등록된 사용자이거나, 잘못된 접근입니다. 메인 페이지로 이동합니다.');
    navigate('/');
    return;
  }

  if (registerData && registerData.role === 'TEACHER') {
    alert('로그인이 완료 되었습니다. 메인페이지로 이동합니다.');
    navigate('/');
    return true;
  }

  return (
    // 디자인 나오기 전 임시
    <div>
      <h2>추가 정보 입력</h2>
      {registerData && (
        <form onSubmit={handleRegisterSubmit}>
          <div>
            <label htmlFor="studentId">학번:</label>
            <input
              id="studentId"
              name="studentId"
              value={registerData.studentId}
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