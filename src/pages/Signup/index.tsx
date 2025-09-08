import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Customapi from '@/shared/config/api';

function RegisterPage() {
  const [grade, setGrade] = useState('');
  const [classNum, setClassNum] = useState('');
  const [stuNumber, setStuNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const stuUserNumber = `${grade}${classNum}${stuNumber.padStart(2, '0')}`; // 2자리로 맞춤
    e.preventDefault();
    setLoading(true);

    try {
      await Customapi.post('/register', {
        
        classCode: stuUserNumber
      });

      // 회원가입 성공 후 메인 페이지로 이동
      navigate('/');
    } catch (err) {
      console.error('회원가입 실패:', err);
      alert('회원가입 중 문제가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // 디자인 나오기 전 임시 
    <div>
      <h2>추가 정보 입력</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="grade">학년:</label>
        <input id="grade" value={grade} onChange={(e) => setGrade(e.target.value)} required />
        <br />
        <label htmlFor="classNum">반:</label>
        <input id="classNum" value={classNum} onChange={(e) => setClassNum(e.target.value)} required />
        <br />
        <label htmlFor='stuNumber'>번호:</label>
        <input id='stuNumber' value={stuNumber} onChange={(e) => setStuNumber(e.target.value)} required/>
        <br />
        <button type="submit" disabled={loading}>
          {loading ? '처리 중...' : '회원가입 완료'}
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
