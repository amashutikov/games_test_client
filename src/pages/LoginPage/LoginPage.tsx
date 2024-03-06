import { useState } from 'react';
import { Loader } from '../../components/Loader/Loader';
import { LogInForm } from '../../components/LogInForm/LogInForm';
import './LoginPage.scss';

export const LoginPage = () => {
  const [pageLoading, setPageLoading] = useState(true);

  const handleLoadingToggle = () => {
    setPageLoading((prev) => !prev);
  };
  return (
    <div className='login_page'>
      {pageLoading && <Loader />}
      <LogInForm pageLoadToggle={handleLoadingToggle} />
    </div>
  );
};
