import './SettingsPage.scss';
import { Button } from '@mui/material';

export const SettingsPage = () => {
  return (
    <div className='settings'>
      <div className='settings__container'>
        <h1 className='settings__title'>ACCOUNT SETTINGS</h1>
        <div className='settings__bio'>
          <img
            src='https://placehold.co/400x400'
            alt='Account image'
            className='settings__bio_image'
          />
          <div>
            <h2 className='settings__bio_name'>Firstname Secondname</h2>
            <div className='settings__bio_container'>
              <Button
                variant='contained'
                type='submit'
                fullWidth
                sx={{
                  backgroundColor: '#3f9c13',
                  transitionDuration: '1000ms',
                  fontFamily: 'inherit',
                  maxWidth: '150px',
                  height: '30px',
                  '&:hover': {
                    transform: 'scale(100.5%)',
                    backgroundColor: '#3f9c13',
                  },
                  alignSelf: 'center',
                }}
              >
                Change photo
              </Button>
              <Button
                variant='contained'
                type='submit'
                fullWidth
                size='medium'
                sx={{
                  backgroundColor: '#3f9c13',
                  transitionDuration: '1000ms',
                  fontFamily: 'inherit',
                  maxWidth: '150px',
                  marginLeft: '20px',
                  height: '30px',
                  '&:hover': {
                    transform: 'scale(100.5%)',
                    backgroundColor: '#3f9c13',
                  },
                  alignSelf: 'center',
                }}
              >
                Delete photo
              </Button>
            </div>
          </div>
        </div>
        <div className='settings__inputs'></div>
      </div>
    </div>
  );
};
