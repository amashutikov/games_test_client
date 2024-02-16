import './SettingsPage.scss';
import { Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import { useUser } from '../../contexts/UserContext';
import { getUserById } from '../../api/user';

export const SettingsPage = () => {
  const { userData, updateUser } = useUser();

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [country, setCountry] = useState(userData.country || '');
  const [name, setName] = useState({
    firstName: userData.firstName || '',
    secondName: userData.secondName || '',
  });
  const [hasFetchedUserData, setHasFetchedUserData] = useState(false);

  useEffect(() => {
    if (userData.id && !hasFetchedUserData) {
      getUserById(userData.id)
        .then((res: any) => {
          console.log(res);
          updateUser({ ...res });
          setHasFetchedUserData(true);
        })
        .catch((err) => console.error(err));
    }
  }, [userData, hasFetchedUserData]);

  const debouncedFetch = debounce((inputValue) => {
    fetch(`https://restcountries.com/v3.1/name/${inputValue}?fields=name,flag`)
      .then((res) => {
        if (!res.ok) {
          console.error('Network response was not ok');
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setSuggestions(
          data.map((country: any) => country.flag + country.name.common)
        );
      })
      .catch((err) => {
        console.error('Fetch error:', err);
      });
  }, 500);

  const handleCountryFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setCountry(inputValue);

    if (inputValue.trim().length !== 0) {
      debouncedFetch(inputValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'firstName') {
      setName((prev) => ({ ...prev, firstName: e.target.value }));
      return;
    }
    setName((prev) => ({ ...prev, secondName: e.target.value }));
  };

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
        <div className='settings__inputs'>
          <div className='settings__inputs_container'>
            <legend className={`settings__inputs_label `}>FIRST NAME</legend>
            <input
              className={`settings__inputs_input`}
              type='text'
              name='firstName'
              placeholder={'Enter your first name'}
              value={name.firstName}
              onChange={handleInputChange}
            />
          </div>

          <div className='settings__inputs_container'>
            <legend className={`settings__inputs_label `}>SECOND NAME</legend>
            <input
              className={`settings__inputs_input`}
              type='text'
              name='secondName'
              placeholder={'Enter your second name'}
              onChange={handleInputChange}
              value={name.secondName}
            />
          </div>

          <div className='settings__inputs_container'>
            <legend className={`settings__inputs_label `}>EMAIL</legend>
            <input
              className={`settings__inputs_input disabled`}
              type='text'
              name='email'
              placeholder={'Enter your first name'}
              disabled
              value={userData.email}
            />
          </div>

          <div className='settings__inputs_container'>
            <legend className={`settings__inputs_label `}>COUNTRY</legend>
            <input
              className={`settings__inputs_input`}
              type='text'
              name='country'
              placeholder={'Start typing your country name'}
              list='suggestions'
              value={country}
              onChange={handleCountryFieldChange}
            />
            <datalist id='suggestions'>
              {suggestions.map((option: string, index: number) => (
                <option key={index} value={option} />
              ))}
            </datalist>
          </div>

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
              margin: '25px auto 0',
              '&:hover': {
                transform: 'scale(100.5%)',
                backgroundColor: '#3f9c13',
              },
            }}
          >
            {
              // eslint-disable-next-line no-constant-condition
              true ? <CircularProgress size={20} color='inherit' /> : 'Save'
            }
          </Button>
        </div>
      </div>
    </div>
  );
};
