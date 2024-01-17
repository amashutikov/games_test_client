import { ChangeEvent, useState } from 'react';
import Input from '@mui/joy/Input';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import './PasswordInput.scss';

type Props = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const PasswordInput: React.FC<Props> = ({
  onChange,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <>
      <label className='register__label'>Please enter your password</label>
      <Input
        onChange={onChange}
        placeholder='Password'
        required
        type={passwordVisible ? 'text' : 'password'}
        size='lg'
        // endDecorator={getEndDecorator(passwordVisible, handleVisibilityToggle)}
        title='Password must meet the following criteria:
                - Minimum length of 6 characters
                - At least one digit'
      />
      <p className='register__message hidden'>
        <InfoOutlined />
        Oops! something is wrong.
      </p>
    </>
  );
};
