import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Login from '../pages/login'
import { UserContext } from '@/entities/Context/LoginContext';
import { useState, useEffect } from 'react';
import NotFound from '@/pages/NotFound/NotFound';
import Home from '../pages/Home/home';
import MyClass from '@/pages/MyClass/MyClass';
import ClassRoom from '@/pages/ClassRoom/ClassRoom';
import TMyclass from '@/pages/TMyClass/TMyclass';
import TClassRoom from '@/pages/TClassRoom/TClassRoom';
import Oauth2Test from '@/features/Login/text';
import TCheckStudent from '@/features/ClassComponent/Teacher/Assignment/TCheckStudent';
import axios from 'axios';
import Navbar from '@/widgets/Navbar/Navbar';
import MakeClass from '@/pages/MakeClass/MakeClass';
import Customapi from '@/shared/api/axios';

function App() {
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    return localStorage.getItem('accessToken');
  });

  useEffect(() => {
    const getJwtToken = async () => {
      try {
        const response = await axios.post('http://10.129.57.64:8080/test', {
          params: {
            userId: 2,
            username: 'admin',
            role: 'TEACHER',
          },
        });
        const token = response.headers.authorization;
        console.log('JWT Token:', token);
        setAccessToken(token);
      } catch (error: any) {
        console.error('JWT 발급 실패:', error.response?.data || error.message);
      }
    };

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    } else {
      getJwtToken();
      localStorage.removeItem('accessToken');
    }
  }, [accessToken]);

  // useEffect(() => {
  //   const getJwtToken = async () => {
  //     try {
  //       const response = await axios.post('http://10.129.57.64:8080/test?userId=2&username=admin&role=TEACHER'
  //       );
  //       console.log(response.headers.authorization)
  //       const token = response.headers.authorization
  //       console.log('JWT Token:', token);
  //       setAccessToken(token);
  //     } catch (error: any) {
  //       console.error('JWT 발급 실패:', error.response?.data || error.message);
  //     }
  //   };

  //   if (accessToken) {
  //     localStorage.setItem('accessToken', accessToken);
  //   } else {
  //     getJwtToken();
  //     localStorage.removeItem('accessToken');
  //   }
  // }, [accessToken]);

  useEffect(() => {
    if (!accessToken) {
      (async () => {
        try {
          const res = await axios.post(
            "http://localhost:8080/refresh-token",
            {},
            {
              withCredentials: true,
            }
          );
          const authHeader = res.headers["authorization"];
          if (authHeader) {
            const token = authHeader.split(" ")[1];
            localStorage.setItem("accessToken", token);
            setAccessToken(token);
          }
        } catch (err) {
          console.warn("자동 리프레시 실패:", err);
        }
      })();
    }
  }, [accessToken]);

  console.log("액세스토큰 : ", accessToken);

  return (
    <RecoilRoot>
      <Router>
        <UserContext.Provider
          value={{ accessToken, setAccessToken }}
        >
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/class" element={<Class />} /> */}
            <Route path="/Login" element={<Login />} />
            <Route path="/Login/test" element={<Oauth2Test />} />
            {/* <Route path="/auth/callback/google" element={<Google />} /> */}
            <Route path="/class" element={<MyClass />} />
            <Route path="/class/:classId" element={<ClassRoom />} />
            <Route path="/tclass" element={<TMyclass />} />
            <Route path="/tclass/:classId" element={<TClassRoom />} />
            <Route path="/tclass/:classId/homework/:lessonId" element={<TCheckStudent />} />
            <Route path="/tclass/make" element={<MakeClass />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </UserContext.Provider>
      </Router>
    </RecoilRoot>
  );
}

export default App;
