import { Routes, Route } from 'react-router-dom';

import NotFound from '@/pages/NotFound';

import STUHome from '@/pages/Student/Main/index';
import STUMyClass from '@/pages/Student/MyClass';
import STUClass from '@/pages/Student/Class';

import TCHHome from '@/pages/Teacher/Main/index';
import TCHMyClass from '@/pages/Teacher/MyClass';
import TCHMakeClass from '@/pages/Teacher/MakeClass';
import TCHMakeTask from '@/pages/Teacher/MakeTask';
import TCHMakeScorecard from '@/pages/Teacher/MakeScorecard';


interface AppRoutesProps {
  role: string | null;
}

export const AppRoutes = ({ role }: AppRoutesProps) => {
  return (
    <Routes>
      {role === 'TCH' && (
        <>
          <Route path="/" element={<TCHHome />} />
          <Route path="/class" element={<TCHMyClass />} />
          <Route path='/class/make' element={<TCHMakeClass />} />
          <Route path='/class/maketask' element={<TCHMakeTask />} />
          <Route path='/class/makescore' element={<TCHMakeScorecard />} />
        </>
      )}
      {role === 'STU' && (
        <>
          <Route path="/" element={<STUHome />} />
          <Route path="/class" element={<STUMyClass />} />
          <Route path="/class/:classRoomId" element={<STUClass />} />
        </>
      )}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
