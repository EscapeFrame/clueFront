import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '@/../public/registerImg.png';
import Customapi from '@/shared/config/api';
import * as s from './styles';

// 유저 타입
interface RegisterData {
  username: string;
  email: string;
  role: string;
  image?: File;
}

function RegisterPage() {
  const [registerData, setRegisterData] = useState<RegisterData | null>(null);
  const [loadingRegisterInfo, setLoadingRegisterInfo] = useState(true);
  const [studentInfo, setStudentInfo] = useState({ grade: '', classNum: '', studentNum: '', studentMail: '' });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();
  const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    const { grade, classNum, studentNum, studentMail } = studentInfo;
    const isEmailValid = registerData?.email ? true : mailRegex.test(studentMail);
    const isValid = grade !== '' && classNum !== '' && studentNum !== '' && isEmailValid;
    setIsFormValid(isValid);
    console.log('studentInfo:', studentInfo); // Debugging line
    console.log('mailRegex test result:', mailRegex.test(studentMail)); // Debugging line
    console.log('isFormValid:', isValid); // Debugging line
  }, [studentInfo, registerData]);

  useEffect(() => {
    // 첫 로그인일 때 요청
    if (window.location.pathname === '/register') {
      Customapi.get('/first-register')
        .then((res) => {
          const data = res.data;
          setRegisterData({
            username: data.username,
            email: data.email,
            role: data.role,
          });
          if (data.email) {
            setStudentInfo((prev) => ({ ...prev, studentMail: data.email }));
          }
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    } else {
      setSelectedImage(null);
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setRegisterData((prev) => (prev ? { ...prev, username: value } : null));
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

    const formData = new FormData();

    const userData = {
      grade: grade,
      classNo: classNum,
      number: studentNum,
      email: mail,
      username: registerData.username,
      role: registerData.role,
    };

    formData.append('user', JSON.stringify(userData));
    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    try {
      await Customapi.post('/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
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
    <s.Container>
      <s.Left>
        <s.Tittle>Welcome to CLUE service</s.Tittle>
        <s.Eclpise />
        <s.Image src={Image} alt="Signup Illustration" width={400} height={300} />
      </s.Left>
      <s.Right>
        <s.Tittle>정보를 입력해주세요</s.Tittle>
        <s.Description>원활한 서비스 사용을 위해 현재 내용을 작성해주세요</s.Description>
        {registerData && (
          <s.Form onSubmit={handleRegisterSubmit}>
            <s.InputGroup>
              <label>학년:</label>
              <s.RadioGroup>
                {[1, 2, 3].map((grade) => (
                  <s.RadioLabel key={grade}>
                    <input
                      type="radio"
                      name="grade"
                      value={grade.toString()}
                      checked={studentInfo.grade === grade.toString()}
                      onChange={handleStudentInfoChange}
                      required
                    />
                    {grade}학년
                  </s.RadioLabel>
                ))}
              </s.RadioGroup>
            </s.InputGroup>
            <s.InputGroup>
              <label>반:</label>
              <s.RadioGroup>
                {[...Array(4)].map((_, i) => {
                  const classNum = i + 1;
                  return (
                    <s.RadioLabel key={classNum}>
                      <input
                        type="radio"
                        name="classNum"
                        value={classNum.toString()}
                        checked={studentInfo.classNum === classNum.toString()}
                        onChange={handleStudentInfoChange}
                        required
                      />
                      {classNum}반
                    </s.RadioLabel>
                  );
                })}
              </s.RadioGroup>
            </s.InputGroup>
            <s.InputGroup>
              <label htmlFor="studentNum">번호:</label>
              <s.Select
                id="studentNum"
                name="studentNum"
                value={studentInfo.studentNum}
                onChange={(e) => setStudentInfo((prev) => ({ ...prev, studentNum: e.target.value }))}
                required
              >
                <option value="" disabled>번호를 선택해주세요.</option>
                {[...Array(18)].map((_, i) => {
                  const studentNum = i + 1;
                  return (
                    <option key={studentNum} value={studentNum.toString()}>
                      {studentNum}번
                    </option>
                  );
                })}
              </s.Select>
            </s.InputGroup>
            <s.InputGroup>
              <label htmlFor="studentMail">메일:</label>
              <input
                id="studentMail"
                name="studentMail"
                value={studentInfo.studentMail}
                placeholder='메일 입력해주세요.'
                onChange={handleStudentInfoChange}
                readOnly={!!registerData?.email}
                required={!registerData?.email}
              />
            </s.InputGroup>
            <s.InputGroup>
              <label htmlFor="username">이름:</label>
              <input
                id="username"
                name="username"
                value={registerData.username}
                placeholder='이름을 입력해주세요.'
                onChange={handleUsernameChange}
                required
              />
            </s.InputGroup>
            <s.InputGroup>
              <label htmlFor="profileImage">프로필 이미지:</label>
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                accept="image/*"
                onChange={handleImageChange}
              />
              {selectedImage && (
                <img src={URL.createObjectURL(selectedImage)} alt="Profile Preview" style={{ width: '100px', height: '100px', borderRadius: '50%', marginTop: '10px' }} />
              )}
            </s.InputGroup>
            <s.SubmitButton type="submit" disabled={!isFormValid}>
              회원가입 완료
            </s.SubmitButton>
          </s.Form>
        )}
      </s.Right>
    </s.Container>
  );
}

export default RegisterPage; 