import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Customapi from '@/shared/config/api';
import * as s from './styles';

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
  const [studentInfo, setStudentInfo] = useState({ grade: '', classNum: '', studentNum: '', studentMail: '' });
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
          console.log("data:", data);
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

    const grade = studentInfo.grade.trim();
    const classNum = studentInfo.classNum.trim();
    const studentNum = studentInfo.studentNum.trim();
    const mail = studentInfo.studentMail.trim();
    
    const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!mailRegex.test(mail)) {
      alert('올바른 이메일 형식이 아닙니다.');
      return;
    }

    const isDigits = (v: string) => /^\d+$/.test(v);
    if (!grade || !classNum || !studentNum || !isDigits(grade) || !isDigits(classNum) || !isDigits(studentNum)) {
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
    <s.Container>
      <s.Tittle>정보를 입력해주세요</s.Tittle>
      {registerData && (
        <s.Form onSubmit={handleRegisterSubmit}>
          <s.InputGroup>
            <label htmlFor="grade">학년:</label>
            <input
              id="grade"
              name="grade"
              value={studentInfo.grade}
              placeholder='학년을 입력해주세요.'
              onChange={handleStudentInfoChange}
              required
            />
          </s.InputGroup>
          <s.InputGroup>
            <label htmlFor="classNum">반:</label>
            <input
              id="classNum"
              name="classNum"
              value={studentInfo.classNum}
              placeholder='반을 입력해주세요.'
              onChange={handleStudentInfoChange}
              required
            />
          </s.InputGroup>
          <s.InputGroup>
            <label htmlFor="studentNum">번호:</label>
            <input
              id="studentNum"
              name="studentNum"
              value={studentInfo.studentNum}
              placeholder='번호를 입력해주세요.'
              onChange={handleStudentInfoChange}
              required
            />
          </s.InputGroup>
          <s.InputGroup>
            <label htmlFor="studentMail">메일:</label>
            <input
              id="studentMail"
              name="studentMail"
              value={studentInfo.studentMail}
              placeholder='메일 입력해주세요.'
              onChange={handleStudentInfoChange}
              required
            />
          </s.InputGroup>
          <s.SubmitButton type="submit">
            회원가입 완료
          </s.SubmitButton>
        </s.Form>
      )}
    </s.Container>
  );
}

export default RegisterPage;