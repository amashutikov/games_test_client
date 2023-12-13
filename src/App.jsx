import React from 'react';
import { Header } from './components/Header/Header';
import { HomePage } from './pages/HomePage';
import './App.css';
// import { Routes, Route, Link, useNavigate, NavLink } from 'react-router-dom';

// import { AccountActivationPage } from './pages/AccountActivationPage';
// import { AuthContext } from './components/AuthContext';
// import { LoginPage } from './pages/LoginPage';
// import { RegistrationPage } from './pages/RegistrationPage';
// import { RequireAuth } from './components/RequireAuth';
// import { UsersPage } from './pages/UsersPage';
// import { Loader } from './components/Loader.jsx';
// import { HomePage } from './pages/HomePage.jsx';
// import { usePageError } from './hooks/usePageError.js';

function App() {
  return <>
    <Header />
    <main className='main'>
      <HomePage />
    </main>
  </>
}

export default App;
