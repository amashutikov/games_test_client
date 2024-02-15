import { Header } from './components/Header/Header';
import { GamesPage } from './pages/GamesPage/GamesPage';
import { HomePage } from './pages/HomePage/HomePage';
import './App.css';
import { RegistrationPage } from './pages/RegistrationPage/RegistrationPage';
import { Footer } from './components/Footer/Footer';

import { Routes, Route } from 'react-router-dom';
import { RegisterSuccessPage } from './pages/RegisterSuccessPage/RegisterSuccessPage';
import { ActivatePage } from './pages/ActivatePage/ActivatePage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { Development } from './components/Development/Development';
import { GoToTopButton } from './components/GoToTopButton/GoToTopButton';
import { NewsPage } from './pages/NewsPage/NewsPage';
import { AllNewsPage } from './pages/AllNewsPage/AllNewsPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { useEffect } from 'react';
import { verify } from './helpers/verify';
import { useUser } from './contexts/UserContext';

// import { AuthContext } from './components/AuthContext';
// import { usePageError } from './hooks/usePageError.js';

function App() {
  const { updateUser } = useUser();

  useEffect(() => {
    const checkVerification = async () => {
      const result = await verify();
      if (typeof result !== 'boolean') {
        updateUser({
          email: result.user.email,
          id: result.user.id,
        });
      } else {
        return;
      }
    };

    checkVerification();
  }, []);

  return (
    <>
      <Header />
      <main className='main'>
        <Routes>
          <Route path='/registration' element={<RegistrationPage />} />

          <Route path='/login' element={<LoginPage />} />

          <Route path='/successregister' element={<RegisterSuccessPage />} />

          <Route path='/activate/:token' element={<ActivatePage />} />

          <Route path='/games' element={<GamesPage />} />

          <Route path='/development' element={<Development />} />

          <Route path='/news' element={<AllNewsPage />} />
          <Route path='/news/:newsId' element={<NewsPage />} />

          <Route path='/' element={<HomePage />} />

          <Route path='*' element={<NotFoundPage />} />
        </Routes>

        <GoToTopButton />
      </main>
      <Footer />
    </>
  );
}

export default App;
