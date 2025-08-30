import { Routes, Route, Navigate } from 'react-router-dom';

import Login from '@/pages/Login';
import RegisterPage from '@/pages/Signup';
import NotFound from '@/pages/NotFound';
import Setting from '@/pages/Common/Setting';

import STUHome from '@/pages/Student/Main/index';
import STUMyClass from '@/pages/Student/MyClass';
import STUClass from '@/pages/Student/Class';

import TCHHome from '@/pages/Teacher/Main/index';
import TCHMyClass from '@/pages/Teacher/MyClass';
import TCHMakeClass from '@/pages/Teacher/MakeClass';
import AddTimeLine from '@/pages/Teacher/AddTimeLine';
import TCHMakeTask from '@/pages/Teacher/MakeTask';
import TCHMakeScorecard from '@/pages/Teacher/MakeScorecard';
import TCHMarkDown from '@/pages/Teacher/MarkDownEditor';
import TCHClass from '@/pages/Teacher/Class';

interface AppRoutesProps {
  role: string | null;
}

export const AppRoutes = ({ role }: AppRoutesProps) => {

  const isAuthenticated = role !== null;

  return (
    <Routes>

      <Route path='/login' element={Login} />
      <Route path='/register' element = {<RegisterPage />} />

      {!isAuthenticated && (
        <>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}
      {role === 'TCH' && (
        <>
          <Route path="/" element={<TCHHome />} />
          <Route path="/class" element={<TCHMyClass />} />
          <Route path="/class/:classRoomId" element={<TCHClass />} />
          <Route path='/class/make' element={<TCHMakeClass />} />
          <Route path='/timeline' element={<AddTimeLine />} />
          <Route path='/class/:classRoomId/maketask' element={<TCHMakeTask />} />
          <Route path='/class/makescore' element={<TCHMakeScorecard />} />
          <Route path='/class/make/markdown' element={<TCHMarkDown />} />
        </>
      )}
      {role === 'STU' && (
        <>
          <Route path="/" element={<STUHome />} />
          <Route path="/class" element={<STUMyClass />} />
          <Route path="/class/:classRoomId" element={<STUClass />} />
        </>
      )}

      {isAuthenticated && (
        <>
          <Route path='/login' element={Login} />
          <Route path='/setting' element={<Setting />} />
          <Route path='setting/user' element={<p>정보 수정 페이지</p>} />
        </>
      )}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
