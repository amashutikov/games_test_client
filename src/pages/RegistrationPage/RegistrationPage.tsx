/* eslint-disable no-empty-pattern */
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography, Button, Box } from '@mui/material';
import './RegistrationPage.scss';
import { authClient } from '../../utils/authClient';
import { Link, useNavigate } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const initialValues = {
  email: '',
  password: '',
  confirmPassword: '',
};

const validationSchema = Yup.object({
  email: Yup.string()
    .strict(true)
    .email('Invalid Email Address!')
    .matches(/\./, 'Invalid Email Address!')
    .required('Email Address is required!'),
  password: Yup.string()
    .strict(true)
    .min(8, 'Password must be minimum 8 characters long')
    .max(32, 'Password is too long!')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)/,
      'Password must contain at least one letter and one number'
    )
    .matches(/^\S*$/, 'Password must not contain spaces')
    .required('Password is required!'),
  confirmPassword: Yup.string()
    .strict(true)
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Password confirmation required!'),
});

export const RegistrationPage = () => {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  const handleVisibilityToggle = (
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => setter((prev) => !prev);

  const navigate = useNavigate();

  const onSubmit = async (values: any) => {
    setErrorMessage('');
    const isFormValid = await formik.validateForm();

    if (isFormValid) {
      setIsSubmiting(true);

      authClient
        .register({ email: values.email, password: values.password })
        .then(() => {
          localStorage.setItem('successRedirect', 'true');
          setTimeout(() => setIsSubmiting(false), 500);

          navigate('/successregister');
        })
        .catch((err) => {
          console.log(err.message);
          setTimeout(() => {
            setIsSubmiting(false);
            setErrorMessage(err.message);
          }, 500);
        });
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <div className='registration_page'>
      <div>
        <form
          autoComplete='off'
          onSubmit={formik.handleSubmit}
          className='registration_page__form'
        >
          <Typography
            variant='h5'
            fontWeight={600}
            mb={2}
            sx={{ fontFamily: 'inherit' }}
          >
            Sign in
          </Typography>

          <div className='registration_page__wrapper'>
            <div className='registration_page__container'>
              <legend
                className={`registration_page__label ${
                  formik.touched.email && 'focused'
                }`}
              >
                Email adress
              </legend>
              <input
                className={`registration_page__input ${
                  Boolean(formik.errors.email) && 'error'
                }`}
                type='text'
                name='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onFocus={() => formik.setFieldTouched('email', true, false)}
                onBlur={formik.handleBlur}
                placeholder={
                  formik.touched.email ? 'e.g. john.doe@mail.com' : ''
                }
              />
            </div>

            <span
              className={`registration_page__helper ${
                Boolean(formik.errors.email) && 'visible'
              }`}
            >
              {(formik.touched.email && formik.errors.email) || 'Hi'}
            </span>
          </div>

          <div className='registration_page__wrapper'>
            <div className='registration_page__container'>
              <legend
                className={`registration_page__label ${
                  formik.touched.password && 'focused'
                }`}
              >
                Password
              </legend>
              <input
                className={`registration_page__input ${
                  Boolean(formik.errors.password) && 'error'
                }`}
                type={passwordVisible ? 'text' : 'password'}
                name='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                onFocus={() => formik.setFieldTouched('password', true, false)}
                onBlur={formik.handleBlur}
                placeholder={formik.touched.password ? 'Password' : ''}
              />
              <RemoveRedEyeIcon
                sx={{
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  right: '20px',
                  color: passwordVisible ? '#3f9c13' : 'inherit',
                }}
                onClick={() => handleVisibilityToggle(setPasswordVisible)}
                onTouchStart={(e) => e.preventDefault()}
              />
            </div>

            <span
              className={`registration_page__helper ${
                Boolean(formik.errors.password) && 'visible'
              }`}
            >
              {formik.errors.password || 'Hi'}
            </span>
          </div>

          <div className='registration_page__wrapper'>
            <div className='registration_page__container'>
              <legend
                className={`registration_page__label ${
                  formik.touched.confirmPassword && 'focused'
                }`}
              >
                Confirm password
              </legend>
              <input
                className={`registration_page__input ${
                  Boolean(formik.errors.confirmPassword) && 'error'
                }`}
                type={confirmationVisible ? 'text' : 'password'}
                name='confirmPassword'
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onFocus={() =>
                  formik.setFieldTouched('confirmPassword', true, false)
                }
                onBlur={formik.handleBlur}
                placeholder={
                  formik.touched.confirmPassword ? 'Confirm your password' : ''
                }
              />
              <RemoveRedEyeIcon
                sx={{
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  right: '20px',
                  color: confirmationVisible ? '#3f9c13' : 'inherit',
                }}
                onClick={() => handleVisibilityToggle(setConfirmationVisible)}
                onTouchStart={(e) => e.preventDefault()}
              />
            </div>

            <span
              className={`registration_page__helper ${
                Boolean(formik.errors.confirmPassword) && 'visible'
              }`}
            >
              {formik.errors.confirmPassword || 'Hi'}
            </span>
          </div>

          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Button
              variant='contained'
              type='submit'
              fullWidth
              size='medium'
              sx={{
                backgroundColor: '#3f9c13',
                transitionDuration: '1000ms',
                fontFamily: 'inherit',
                maxWidth: '200px',
                height: '40px',
                '&:hover': {
                  transform: 'scale(100.5%)',
                  backgroundColor: '#3f9c13',
                },
              }}
            >
              {isSubmiting ? (
                <CircularProgress size={20} color='inherit' />
              ) : (
                'Register'
              )}
            </Button>
            <span
              className={`registration_page__helper ${
                errorMessage && 'visible'
              }`}
            >
              {errorMessage || 'Hi'}
            </span>
          </Box>

          <span className='registration_page__text'>
            Already have an account?{' '}
            <Link className='registration_page__link' to='/login'>
              Log in
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};
