import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrationSuccessPage.scss';

export const RegisterSuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const wasRedirected = localStorage.getItem('successRedirect') === 'true';

    if (!wasRedirected) {
      navigate('/');
    }
  }, []);

  return (
    <div className='regs_page'>
      <h1 className='regs_page__title'>Account Activation</h1>
      <p className='regs_page__text'>
        Thank you for registering! To activate your account, please check your
        email inbox and follow the instructions provided.
      </p>
      <p className='regs_page__text'>
        If you don&#39;t see the email, be sure to check your spam folder. If
        you need further assistance,{' '}
        <a href='mailto:
miraplayautorization@gmail.com' className='regs_page__link'>contact support</a>.
      </p>
    </div>
  );
};
