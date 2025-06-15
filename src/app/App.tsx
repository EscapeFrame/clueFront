import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Login from '../pages/login'
import { UserContext } from '@/entities/Context/LoginContext';
import { useState, useEffect } from 'react';
import NotFound from '@/pages/NotFound';
import Home from '../pages/home';
import MyClass from '@/pages/MyClass';
import ClassRoom from '@/pages/ClassRoom';
import TMyclass from '@/pages/TMyclass';
import TClassRoom from '@/pages/TClassRoom';
import axios from 'axios';

function App() {
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    return localStorage.getItem('accessToken');
  });

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    } else {
      localStorage.removeItem('accessToken');
    }
  }, [accessToken]);

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

  console.log("액세스토큰 : ",accessToken);

  return (
    <RecoilRoot>
      <Router>
        <UserContext.Provider
          value={{ accessToken, setAccessToken }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/class" element={<Class />} /> */}
            <Route path="/Login" element={<Login />} />
            {/* <Route path="/auth/callback/google" element={<Google />} /> */}
            <Route path="/class" element={<MyClass />} />
            <Route path="/class/:classId" element={<ClassRoom />} />
            <Route path="/tclass" element={<TMyclass />} />
            <Route path="/tclass/:classId" element={<TClassRoom />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </UserContext.Provider>
      </Router>
    </RecoilRoot>
  );
}

export default App;
