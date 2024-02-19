import './LoginPage.scss';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography, Button, Box } from '@mui/material';
import { authClient } from '../../utils/AuthClient';
import { Link, useNavigate } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Loader } from '../../components/Loader/Loader';
import { verify } from '../../helpers/verify';
import { useUser } from '../../contexts/UserContext';

const initialValues = {
  email: '',
  password: '',
};

export const LoginPage = () => {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const { updateUser } = useUser();

  const handleVisibilityToggle = (
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => setter((prev) => !prev);

  useEffect(() => {
    const checkVerification = async () => {
      const result = await verify();
      if (typeof result !== 'boolean') {
        navigate('/games');
      } else {
        setPageLoading(false);
        return;
      }
    };

    checkVerification();
  }, []);

  const navigate = useNavigate();

  const onSubmit = async (values: any) => {
    setErrorMessage('');

    setIsSubmiting(true);

    authClient
      .login({ email: values.email, password: values.password })
      .then((res: any) => {
        localStorage.setItem('successRedirect', 'true');
        updateUser({
          email: res.user.email,
          id: res.user.id,
        });
        setTimeout(() => setIsSubmiting(false), 500);

        navigate('/games');
      })
      .catch((err) => {
        console.log(err.message);
        setTimeout(() => {
          setIsSubmiting(false);
          setErrorMessage(err.message);
        }, 500);
      });
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  if (pageLoading) {
    return <Loader />;
  }

  return (
    <div className='login_page'>
      <div>
        <form
          autoComplete='off'
          onSubmit={formik.handleSubmit}
          className='login_page__form'
        >
          <Typography
            variant='h5'
            fontWeight={600}
            mb={2}
            sx={{ fontFamily: 'inherit' }}
          >
            Sign in
          </Typography>

          <div className='login_page__wrapper'>
            <div className='login_page__container'>
              <legend
                className={`login_page__label ${
                  formik.touched.email && 'focused'
                }`}
              >
                Email adress
              </legend>
              <input
                className={`login_page__input`}
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

            <span className={`login_page__helper`}>
              {(formik.touched.email && formik.errors.email) || 'Hi'}
            </span>
          </div>

          <div className='login_page__wrapper'>
            <div className='login_page__container'>
              <legend
                className={`login_page__label ${
                  formik.touched.password && 'focused'
                }`}
              >
                Password
              </legend>
              <input
                className={`login_page__input`}
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

            <span className={`login_page__helper`}>
              {formik.errors.password || 'Hi'}
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
                'Sign in'
              )}
            </Button>
            <span className={`login_page__helper ${errorMessage && 'visible'}`}>
              {errorMessage || 'Hi'}
            </span>
          </Box>

          <span className='login_page__text'>
            Don&#39;t have an account?{' '}
            <Link className='login_page__link' to='/registration'>
              Register
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};
