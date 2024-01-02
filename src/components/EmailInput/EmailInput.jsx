import React from 'react';
import Input from '@mui/joy/Input';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import './EmailInput.scss';

export const EmailInput = ({ onChange }) => {
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
