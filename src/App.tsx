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

// import { AuthContext } from './components/AuthContext';
// import { RequireAuth } from './components/RequireAuth';
// import { UsersPage } from './pages/UsersPage';
// import { Loader } from './components/Loader.jsx';
// import { usePageError } from './hooks/usePageError.js';

function App() {
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

          <Route path='/' element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
