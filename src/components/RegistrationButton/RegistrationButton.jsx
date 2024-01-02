import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import './RegistrationButton.scss';

export const RegistrationButton = ({
  onClick,
  isLoading,
  popperVisible,
  popperMessage,
  handlePopperClose,
}) => {
  return (
    <div>
      <ClickAwayListener onClickAway={handlePopperClose}>
        <Box sx={{ position: 'relative' }}>
          <button onClick={onClick} type='submit' className='register__button'>
            {isLoading ? (
              <CircularProgress size={20} color='inherit' />
            ) : (
              'Register'
            )}
          </button>
          {popperVisible ? (
            <Box
              sx={{
                position: 'absolute',
                top: 41,
                right: 0,
                left: 0,
                zIndex: 1,
                border: '1px solid #3f9c13',
                color: '#3f9c13',
                borderRadius: '10px',
                p: 1,
                bgcolor: '#1d1d1d',
              }}
            >
              {popperMessage}
            </Box>
          ) : null}
        </Box>
      </ClickAwayListener>
    </div>
  );
};
