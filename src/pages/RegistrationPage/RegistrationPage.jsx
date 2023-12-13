import React from 'react';
import './RegistrationPage.scss';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import FormHelperText from '@mui/joy/FormHelperText';

export const RegistrationPage = () => {
  return (
    <div className='register'>
      <form className='register__form'>
        <h2 className='register__form-title'>Welcome!</h2>

        <Stack spacing={2}>
          <label className='register__label'>Please enter your email</label>
          <Input placeholder='Email' required />
          <FormHelperText>
            <InfoOutlined />
            Opps! something is wrong.
          </FormHelperText>

          <label className='register__label'>Please enter your password</label>
          <Input placeholder='Password' required />
          <FormHelperText>
            <InfoOutlined />
            Opps! something is wrong.
          </FormHelperText>

          <label className='register__label'>Please confirm your passwoord</label>
          <Input placeholder='Confirm password' required />
          <FormHelperText >
            <InfoOutlined />
            Opps! something is wrong.
          </FormHelperText>

          <button type='submit' className='register__button'>Register</button>
        </Stack>
      </form>
    </div>
  );
};
