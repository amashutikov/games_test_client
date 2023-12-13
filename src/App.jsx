import React from 'react';
import { Header } from './components/Header/Header';
// import { GamesPage } from './pages/GamesPage/GamesPage';
// import { HomePage } from './pages/HomePage/HomePage';
import './App.css';
import { RegistrationPage } from './pages/RegistrationPage/RegistrationPage';

// import { Routes, Route, Link, useNavigate, NavLink } from 'react-router-dom';

// import { AccountActivationPage } from './pages/AccountActivationPage';
// import { AuthContext } from './components/AuthContext';
// import { LoginPage } from './pages/LoginPage';
// import { RegistrationPage } from './pages/RegistrationPage';
// import { RequireAuth } from './components/RequireAuth';
// import { UsersPage } from './pages/UsersPage';
// import { Loader } from './components/Loader.jsx';
// import { usePageError } from './hooks/usePageError.js';

function App() {
  return <>
    <Header />
    <main className='main'>
      {/* <GamesPage /> */}
      {/* <HomePage /> */}
      <RegistrationPage />
    </main>
  </>
}

export default App;
