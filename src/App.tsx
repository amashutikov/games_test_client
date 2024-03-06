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
import { SettingsPage } from './pages/SettingsPage/SettingsPage';
import { getUserById } from './api/user';
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage';

function App() {
  const { updateUser } = useUser();

  useEffect(() => {
    const checkVerification = async () => {
      const result = await verify();
      if (typeof result !== 'boolean') {
        getUserById(result.userId)
          .then((res) => {
            updateUser({ ...res, logged: true });
          })
          .catch((err) => console.error(err));
      } else {
        return;
      }
    };

    checkVerification();
  }, []);

  return (
    <>
      <Header />
      <main className='main' id='main'>
        <Routes>
          <Route path='/registration' element={<RegistrationPage />} />

          <Route path='/login' element={<LoginPage />} />

          <Route path='/successregister' element={<RegisterSuccessPage />} />

          <Route path='/activate/:token' element={<ActivatePage />} />

          <Route path='/games' element={<GamesPage />} />

          <Route path='/development' element={<Development />} />

          <Route path='/favorites' element={<FavoritesPage />} />

          <Route path='/news' element={<AllNewsPage />} />
          <Route path='/settings' element={<SettingsPage />} />
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
