import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Customapi from '@/shared/config/api';

function RegisterPage() {
  const [grade, setGrade] = useState('');
  const [classNum, setClassNum] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const accessToken = localStorage.getItem('accessToken');
      await Customapi.post('/register', {
        grade,
        classNum,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
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
        <label>
          학년:
          <input value={grade} onChange={(e) => setGrade(e.target.value)} required />
        </label>
        <br />
        <label>
          반:
          <input value={classNum} onChange={(e) => setClassNum(e.target.value)} required />
        </label>
        <br />
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? '처리 중...' : '회원가입 완료'}
        </button>
    </div>
  );
}

export default RegisterPage;
