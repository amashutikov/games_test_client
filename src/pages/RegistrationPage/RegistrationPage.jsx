import React, { useState } from 'react';
import './RegistrationPage.scss';
import { EmailInput } from '../../components/EmailInput/EmailInput';
import { PasswordInput } from '../../components/PasswordInput/PasswordInput';
import { ConfirmationInput } from '../../components/ConfirmationInput/ConfirmationInput';
import { RegistrationButton } from '../../components/RegistrationButton/RegistrationButton';
import { validatePassword } from '../../helpers/validatePassword';
import { authClient } from '../../utils/authClient';
import { useNavigate } from 'react-router-dom';

export const RegistrationPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [popperVisible, setPopperVisible] = useState(false);
  const [popperMessage, setPopperMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmation = () => {
    setShowConfirmation(!showConfirmation);
  };

  const handleInputChange = (event, setter) => {
    const value = event.target.value;

    setPopperVisible(false);
    setter(value);
  };

  const handlePopperClose = () => {
    setPopperVisible(false);
    setPopperMessage('');
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();

    if (!email || !password || !confirmation) {
      setPopperVisible(true);
      setPopperMessage('Fill all the fields please');
      return;
    }

    if (password !== confirmation) {
      setPopperVisible(true);
      setPopperMessage(
        'Password and confirmation do not match. Please double-check and try again.'
      );
      return;
    }

    const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

    if (!emailPattern.test(email)) {
      setPopperVisible(true);
      setPopperMessage('Email is not valid');
      return;
    }

    const validPassword = validatePassword(password);

    if (!validPassword.passwordValid) {
      setPopperVisible(true);
      setPopperMessage(validPassword.message.replace('string', 'password'));
      return;
    }

    setIsLoading(true);

    authClient
      .register({ email, password })
      .then(() => {
        localStorage.setItem('successRedirect', 'true');
        setIsLoading(false);

        navigate('/successregister');
      })
      .catch((err) => {
        console.log(err.message);
        setIsLoading(false);
        setPopperVisible(true);
        setPopperMessage(err.message);
      });
  };

  return (
    <div className='register'>
      <form className='register__form'>
        <h2 className='register__form-title'>Welcome!</h2>

        <EmailInput onChange={(e) => handleInputChange(e, setEmail)} />

        <PasswordInput
          onChange={(e) => handleInputChange(e, setPassword)}
          showPassword={showPassword}
          handleTogglePassword={handleTogglePassword}
        />

        <ConfirmationInput
          onChange={(e) => handleInputChange(e, setConfirmation)}
          showConfirmation={showConfirmation}
          handleToggleConfirmation={handleToggleConfirmation}
        />

        <RegistrationButton
          onClick={handleRegisterClick}
          isLoading={isLoading}
          popperVisible={popperVisible}
          popperMessage={popperMessage}
          handlePopperClose={handlePopperClose}
        />
      </form>
    </div>
  );
};
