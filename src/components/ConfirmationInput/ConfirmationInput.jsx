import React from 'react';
import Input from '@mui/joy/Input';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import './ConfirmationInput.scss';

export const ConfirmationInput = ({
  onChange,
  showConfirmation,
  handleToggleConfirmation,
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
      <label className='register__label'>Please confirm your password</label>
      <Input
        onChange={onChange}
        placeholder='Confirm password'
        required
        type={showConfirmation ? 'text' : 'password'}
        size='lg'
        endDecorator={getEndDecorator(
          showConfirmation,
          handleToggleConfirmation
        )}
      />
      <p className='register__message hidden'>
        <InfoOutlined />
        Oops! something is wrong.
      </p>
    </>
  );
};
