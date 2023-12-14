import React, { useState } from 'react';
import './RegistrationPage.scss';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export const RegistrationPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmation = () => {
    setShowConfirmation(!showConfirmation);
  };

  const handleTouchToggle = (setter) => () => {
    setter((prev) => !prev);
  };

  const getEndDecorator = (show, toggleHandler) => {
    return show ? (
      <VisibilityOffIcon
        className='input_hide'
        onMouseDown={toggleHandler}
        onMouseUp={toggleHandler}
        onTouchStart={handleTouchToggle(toggleHandler)}
        onMouseOut={() => toggleHandler(false)}
      />
    ) : (
      <RemoveRedEyeIcon
        className='input_hide'
        onMouseDown={toggleHandler}
        onMouseUp={toggleHandler}
        onTouchStart={handleTouchToggle(toggleHandler)}
        onMouseOut={() => toggleHandler(false)}
      />
    );
  };

  return (
    <div className='register'>
      <form className='register__form'>
        <h2 className='register__form-title'>Welcome!</h2>

        <Stack spacing={2}>
          <label className='register__label'>Please enter your email</label>
          <Input placeholder='Email' required size='lg' />
          <p className='register__message hidden'>
            <InfoOutlined />
            Oops! something is wrong.
          </p>

          <label className='register__label'>Please enter your password</label>
          <Input
            placeholder='Password'
            required
            type={showPassword ? 'text' : 'password'}
            size='lg'
            endDecorator={getEndDecorator(showPassword, handleTogglePassword)}
          />
          <p className='register__message hidden'>
            <InfoOutlined />
            Oops! something is wrong.
          </p>

          <label className='register__label'>
            Please confirm your password
          </label>
          <Input
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

          <button type='submit' className='register__button'>
            Register
          </button>
        </Stack>
      </form>
    </div>
  );
};
