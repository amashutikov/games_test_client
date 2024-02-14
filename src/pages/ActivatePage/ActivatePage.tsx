import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { authClient } from '../../utils/authClient';
import './ActivatePage.scss';

export const ActivatePage = () => {
  const { token } = useParams();

  useEffect(() => {
    authClient
      .activate(token)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  return (
    <div className='activate_page'>
      <h1 className='activate_page__title'>Account Activated!</h1>
      <p className='activate_page__text'>
        Congratulations! Your account has been successfully activated.
      </p>
      <p className='activate_page__text'>
        You can now{' '}
        <Link to='/' className='activate_page__link'>
          go back to the home page
        </Link>{' '}
        and log in using your credentials. <br /> If you have any questions or
        need further assistance,{' '}
        <a href='mailto:support@example.com' className='activate_page__link'>
          contact support
        </a>
        .
      </p>
    </div>
  );
};
