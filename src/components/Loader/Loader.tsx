import { Oval } from 'react-loader-spinner';
import './Loader.scss';

export const Loader = () => {
  return (
    <div className='loader'>
      <Oval
        height={100}
        width={100}
        color='#4fa94d'
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor='#4fa94d'
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};
