import { Routes, Route, Navigate } from 'react-router-dom';

import { Login } from '@/pages/Login/index';
import RegisterPage from '@/pages/Signup';
import NotFound from '@/pages/NotFound';
import Setting from '@/pages/Common/Setting/Setting';

import STUHome from '@/pages/Student/Main/index';
import STUMyClass from '@/pages/Student/MyClass';
import STUClass from '@/pages/Student/Class';
// import STUQuiz from '@/pages/Student/Quiz';

import TCHHome from '@/pages/Teacher/Main/index';
import TCHMyClass from '@/pages/Teacher/MyClass';
import TCHMakeClass from '@/pages/Teacher/Make/MakeClass';
import AddTimeLine from '@/pages/Teacher/AddTimeLine';
import TCHMakeTask from '@/pages/Teacher/Make/MakeTask';
import TCHMakeScorecard from '@/pages/Teacher/Make/MakeScorecard';
import TCHMarkDown from '@/pages/Teacher/Make/MarkDownEditor';
import TCHClass from '@/pages/Teacher/Class';
import TCHMakeLesson from '@/pages/Teacher/Make/MakeLesson';
import ClassSetting from '@/pages/Teacher/ClassSetting';
import TCHMakeSlide from '@/pages/Teacher/Make/MakeSlide';
import TCHMakeFile from '@/pages/Teacher/Make/MakeFile';
import MarkDownViewerPage from '@/features/Common/Class/Lesson/markdown/Markdown';
import GenerateProblem from '@/pages/Teacher/Make/GenerateProblem';
import MakeClassMaterials from '@/pages/Teacher/Make/MakeClassMaterials';

import { LinkSaveRoutes } from '@/linkSave/app/Routes';
// import TCHQuiz from '@/pages/Teacher/Quiz';
// import QuizApiTest from '@/pages/Common/QuizApiTest';

interface AppRoutesProps {
  role: string | null;
  loading: boolean;
}

export const AppRoutes = ({ role, loading }: AppRoutesProps) => {
  const isAuthenticated = !!role;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<Navigate to="/" replace />} />
      <Route path="/register" element={<Navigate to="/" replace />} />

      {role === 'TCH' && (
        <>
          <Route path="/" element={<TCHHome />} />
          <Route path="/class" element={<TCHMyClass />} />
          <Route path="/class/:classRoomId" element={<TCHClass />} />
          <Route path="/class/:classRoomId/:documentId" element={<MarkDownViewerPage />} />
          <Route path="/class/make" element={<TCHMakeClass />} />
          <Route path="/timeline" element={<AddTimeLine />} />
          <Route path="/class/:classRoomId/make/task" element={<TCHMakeTask />} />
          <Route path="/class/make/score" element={<TCHMakeScorecard />} />
          <Route path="/class/:classRoomId/:directoryId/make/lesson/markdown" element={<TCHMarkDown />} />
          <Route path="/class/:classRoomId/:directoryId/make/lesson/markdown/problem" element={<GenerateProblem />} />
          <Route path="/class/:classRoomId/:directoryId/make/lesson" element={<TCHMakeLesson />} />
          <Route path="/class/:classRoomId/:directoryId/make/lesson/google-slide" element={<TCHMakeSlide />} />
          <Route path="/class/:classRoomId/:directoryId/make/lesson/file" element={<TCHMakeFile />} />
          <Route path="/class/:classRoomId/setting" element={<ClassSetting />} />
          <Route path="/class/:classRoomId/:directoryId/make/lesson/MakeClassMaterials" element={<MakeClassMaterials />} />
          {/* <Route path="/quiz" element={<TCHQuiz />} /> */}
        </>
      )}
      {role === 'STU' && (
        <>
          <Route path="/" element={<STUHome />} />
          <Route path="/class" element={<STUMyClass />} />
          <Route path="/class/:classRoomId" element={<STUClass />} />
          <Route path="/class/:classRoomId/:documentId" element={<MarkDownViewerPage />} />
          {/* <Route path="/quiz" element={<STUQuiz />} /> */}
          <Route path="/linksave/*" element={<LinkSaveRoutes />} />
        </>
      )}

      {isAuthenticated && (
        <>
          <Route path="/setting" element={<Setting />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* <Route path="/quiz-api-test" element={<QuizApiTest />} /> */}
        </>
      )}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
