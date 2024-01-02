import React from 'react';
import Input from '@mui/joy/Input';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import './PasswordInput.scss';

export const PasswordInput = ({
  onChange,
  showPassword,
  handleTogglePassword,
}) => {
  const getEndDecorator = (show, toggleHandler) => {
    return show ? (
      <VisibilityOffIcon
        className='input_hide'
        onClick={toggleHandler}
        onTouchStart={(e) => e.preventDefault()}
      />
    ) : (
      <RemoveRedEyeIcon
        className='input_hide'
        onClick={toggleHandler}
        onTouchStart={(e) => e.preventDefault()}
      />
    );
  };

  return (
    <>
      <label className='register__label'>Please enter your password</label>
      <Input
        onChange={onChange}
        placeholder='Password'
        required
        type={showPassword ? 'text' : 'password'}
        size='lg'
        endDecorator={getEndDecorator(showPassword, handleTogglePassword)}
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
