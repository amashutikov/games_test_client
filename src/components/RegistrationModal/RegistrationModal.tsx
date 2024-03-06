import { useEffect, useState } from 'react';
import { RegisterForm } from '../RegisterForm/RegisterForm';
import './RegistrationModal.scss';
import { CloseButton } from '../CloseButton/CloseButton';
import { Oval } from 'react-loader-spinner';
import { createPortal } from 'react-dom';

type Props = {
  onCloseModal: () => void;
};

export const RegistrationModal: React.FC<Props> = ({ onCloseModal }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.classList.add('modal-open');

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  const handleLoadingToggle = () => {
    setLoading((prev) => !prev);
  };

  const handleCloseModal = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    onCloseModal();
  };

  const mainElement = document.getElementById('main')!;

  return createPortal(
    <div className='registration_modal' onClick={handleCloseModal}>
      {loading && (
        <div className='registration_modal__loader'>
          <Oval
            height={50}
            width={50}
            color='#4fa94d'
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor='#4fa94d'
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      )}

      <div className='registration_modal__container'>
        <div className='registration_modal__close' onClick={handleCloseModal}>
          <CloseButton />
        </div>
        {loading && null}
        <RegisterForm pageLoadToggle={handleLoadingToggle} />
      </div>
    </div>,
    mainElement
  );
};
