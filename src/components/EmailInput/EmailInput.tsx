import Input from '@mui/joy/Input';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import './EmailInput.scss';
import { ChangeEvent } from 'react';

type Props = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const EmailInput: React.FC<Props> = ({ onChange }) => {
  return (
    <>
      <label className='register__label'>Please enter your email</label>
      <Input onChange={onChange} placeholder='Email' required size='lg' />
      <p className='register__message hidden'>
        <InfoOutlined />
        Oops! something is wrong.
      </p>
    </>
  );
};
