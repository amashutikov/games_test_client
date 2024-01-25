import { Typography } from '@mui/material';
import React, { useState } from 'react';

type Props = {
  storyline: string;
};

export const Storyline: React.FC<Props> = ({ storyline }) => {
  const [showFullText, setShowFullText] = useState(false);

  const handleToggleText = () => {
    setShowFullText((prevShowFullText) => !prevShowFullText);
  };

  return (
    <>
      <Typography
        sx={{
          fontFamily: 'inherit',
          color: 'white',
          alignSelf: 'flex-start',
          margin: '20px 0 10px 20px',
        }}
        variant='h4'
      >
        Storyline:
      </Typography>

      <Typography
        sx={{
          fontFamily: 'inherit',
          color: 'white',
          margin: '20px',
        }}
        variant='body1'
      >
        {showFullText || storyline.length < 800 ? (
          <>
            {storyline + ' '}
            {showFullText && (
              <Typography
                sx={{
                  display: 'inline',
                  fontFamily: 'inherit',
                  color: '#3f9c13',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
                variant='body1'
                onClick={handleToggleText}
              >
                Show less
              </Typography>
            )}
          </>
        ) : (
          <>
            {storyline.slice(0, 800) + '... '}
            <Typography
              sx={{
                display: 'inline',
                fontFamily: 'inherit',
                color: '#3f9c13',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
              variant='body1'
              onClick={handleToggleText}
            >
              Show more
            </Typography>
          </>
        )}
      </Typography>
    </>
  );
};
