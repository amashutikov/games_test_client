import './LogInForm.scss';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography, Button, Box } from '@mui/material';
import { authClient } from '../../utils/AuthClient';
import { Link, useNavigate } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { SetStateAction, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { verify } from '../../helpers/verify';
import { useUser } from '../../contexts/UserContext';

const initialValues = {
  email: '',
  password: '',
};

type Props = {
  pageLoadToggle: () => void;
};

export const LogInForm: React.FC<Props> = ({ pageLoadToggle }) => {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

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
        pageLoadToggle();
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
        updateUser({
          ...res.user,
          logged: true,
        });
        setTimeout(() => setIsSubmiting(false), 500);

        navigate('/games');
      })
      .catch((err: { message: SetStateAction<string> }) => {
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
  return (
    <div className='login'>
      <form
        autoComplete='off'
        onSubmit={formik.handleSubmit}
        className='login__form'
      >
        <Typography
          variant='h5'
          fontWeight={600}
          mb={2}
          sx={{ fontFamily: 'inherit' }}
        >
          Log in
        </Typography>

        <div className='login__wrapper'>
          <div className='login__container'>
            <legend
              className={`login__label ${
                formik.touched.email && 'focused'
              }`}
            >
              Email adress
            </legend>
            <input
              className={`login__input`}
              type='text'
              name='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              onFocus={() => formik.setFieldTouched('email', true, false)}
              onBlur={formik.handleBlur}
              placeholder={formik.touched.email ? 'e.g. john.doe@mail.com' : ''}
            />
          </div>

          <span className={`login__helper`}>
            {(formik.touched.email && formik.errors.email) || 'Hi'}
          </span>
        </div>

        <div className='login__wrapper'>
          <div className='login__container'>
            <legend
              className={`login__label ${
                formik.touched.password && 'focused'
              }`}
            >
              Password
            </legend>
            <input
              className={`login__input`}
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

          <span className={`login__helper`}>
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
          <span className={`login__helper ${errorMessage && 'visible'}`}>
            {errorMessage || 'Hi'}
          </span>
        </Box>

        <span className='login__text'>
          Don&#39;t have an account?{' '}
          <Link className='login__link' to='/registration'>
            Register
          </Link>
        </span>
      </form>
    </div>
  );
};
