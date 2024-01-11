import { ChangeEvent, useState } from 'react';
import './RegistrationPage.scss';
import { EmailInput } from '../../components/EmailInput/EmailInput';
import { PasswordInput } from '../../components/PasswordInput/PasswordInput';
import { ConfirmationInput } from '../../components/ConfirmationInput/ConfirmationInput';
import { RegistrationButton } from '../../components/RegistrationButton/RegistrationButton';
import { authClient } from '../../utils/authClient';
import { useNavigate } from 'react-router-dom';

export const RegistrationPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [popperVisible, setPopperVisible] = useState(false);
  const [popperMessage, setPopperMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>, setter: (value: string) => void) => {
    const value = event.target.value;

    setPopperVisible(false);
    setter(value);
  };

  const handlePopperClose = () => {
    setPopperVisible(false);
    setPopperMessage('');
  };

  const handleRegisterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
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

    const validPassword = password;

    if (!validPassword) {
      setPopperVisible(true);
      setPopperMessage('yes');
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

        <EmailInput onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e, setEmail)} />

        <PasswordInput
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e, setPassword)}
        />

        <ConfirmationInput
          onChange={(e) => handleInputChange(e, setConfirmation)}
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
