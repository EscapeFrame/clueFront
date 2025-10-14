import { Routes, Route } from 'react-router-dom';
import NotFound from '@/pages/NotFound';
import LinkSaveMain from '@/linkSave/pages/Main';

export const LinkSaveRoutes = () => {

  return (
    <Routes>
      <Route path="/" element={<LinkSaveMain />} />

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
};
