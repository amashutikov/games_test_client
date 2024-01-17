import Input from '@mui/joy/Input';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import './ConfirmationInput.scss';
import { ChangeEvent, useState } from 'react';

type Props = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const ConfirmationInput: React.FC<Props> = ({
  onChange,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <>
      <label className='register__label'>Please confirm your password</label>
      <Input
        onChange={onChange}
        placeholder='Confirm password'
        required
        type={passwordVisible ? 'text' : 'password'}
        size='lg'
        // endDecorator={getEndDecorator(
        //   passwordVisible,
        //   handleVisibilityToggle
        // )}
      />
      <p className='register__message hidden'>
        <InfoOutlined />
        Oops! something is wrong.
      </p>
    </>
  );
};
