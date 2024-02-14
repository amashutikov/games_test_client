import { Link } from 'react-router-dom';
import './NotFoundPage.scss';

export const NotFoundPage = () => {
  return (
    <div className='not_found_page'>
      <h1 className='not_found_page__title'>
        Oops
        <span className='not_found_page__dot'>.</span>
        <span className='not_found_page__dot'>.</span>
        <span className='not_found_page__dot'>.</span>
        &nbsp;&nbsp;Page was not found
      </h1>
      <p>
        You can go back to the <Link to='/'>home page</Link>.
      </p>
    </div>
  );
};
