import { useState } from 'react';
import { RegisterForm } from '../../components/RegisterForm/RegisterForm';
import './RegistrationPage.scss';
import { Loader } from '../../components/Loader/Loader';

export const RegistrationPage = () => {
  const [pageLoading, setPageLoading] = useState(true);

  const handleLoadingToggle = () => {
    setPageLoading((prev) => !prev);
  };

  return (
    <div className='registration_page'>
      {pageLoading && <Loader />}
      <RegisterForm pageLoadToggle={handleLoadingToggle} />
    </div>
  );
};
