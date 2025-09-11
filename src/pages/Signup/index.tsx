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
  const [studentInfo, setStudentInfo] = useState({ grade: '', classNum: '', studentNum: '' });
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
            classCode: '',
            role: data.role,
          });
          console.log("data:",data);
        })
        .finally(() => setLoadingRegisterInfo(false));
    } else {
      setLoadingRegisterInfo(false);
    }
  }, [navigate]);

  const handleStudentInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudentInfo((prev) => ({ ...prev, [name]: value }));
  };

  //신규 사용자의 폼
  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('registerData:', registerData);
    // 데이터가 없으면 리턴
    if (!registerData) return;

    const { grade, classNum, studentNum } = studentInfo;

    if (!grade || !classNum || !studentNum) {
      alert('학년, 반, 번호를 모두 입력해주세요.');
      return;
    }

    try {
      const classCode = `${grade}${classNum}${studentNum.padStart(2, '0')}`;
      const payload = {
        ...registerData,
        classCode: classCode,
      };
      await Customapi.post('/register', payload);
      alert('회원가입 완료! 메인 페이지로 이동합니다.');
      navigate('/');
    } catch (err) {
      console.error('회원가입 실패:', err);
      alert('회원가입 중 오류가 발생했습니다.');
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
      <h2>정보를 입력해주세요</h2>
      {registerData && (
        <form onSubmit={handleRegisterSubmit}>
          <div>
            <label htmlFor="grade">학년:</label>
            <input
              id="grade"
              name="grade"
              value={studentInfo.grade}
              onChange={handleStudentInfoChange}
              required
            />
          </div>
          <div>
            <label htmlFor="classNum">반:</label>
            <input
              id="classNum"
              name="classNum"
              value={studentInfo.classNum}
              onChange={handleStudentInfoChange}
              required
            />
          </div>
          <div>
            <label htmlFor="studentNum">번호:</label>
            <input
              id="studentNum"
              name="studentNum"
              value={studentInfo.studentNum}
              onChange={handleStudentInfoChange}
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