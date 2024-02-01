import { useState, useEffect } from 'react';
import './GamesPage.scss';
import { CardList } from '../../components/CardList/CardList';
import { GenreSelect } from '../../components/GenreSelect/GenreSelect';
import { getAmountOfGames, getGames } from '../../api/games';
import { useDispatch } from 'react-redux';
import { actions as gamesToShowActions } from '../../store/gamesToShow';
import { Loader } from '../../components/Loader/Loader';
import { verify } from '../../helpers/verify';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Pagination } from '../../components/Pagination/Pagination';

export const GamesPage = () => {
  const [searchParams] = useSearchParams();

  const [page, setPage] = useState(
    searchParams.get('page') ? Number(searchParams.get('page')) : 1
  );
  const [pageLoading, setPageLoading] = useState(true);
  const [genre, setGenre] = useState(searchParams.get('gameGenreId') || null);
  const [gamesCount, setGamesCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (Number(searchParams.get('page')) !== page) {
      setPage(Number(searchParams.get('page')));
    }
  }, [searchParams]);

  useEffect(() => {
    const checkVerification = async () => {
      const result = await verify();
      if (!result) {
        navigate('/registration');
      } else {
        return;
      }
    };

    checkVerification();
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    setPageLoading(true);

    getGames(page, genre).then((res) => {
      dispatch(gamesToShowActions.replace(res));
      setPageLoading(false);
    });
  }, [page, genre]);

  useEffect(() => {
    getAmountOfGames(page, genre).then((res) => setGamesCount(Number(res)));
  }, [genre]);

  const handleGenreChange = (newGenre: string) => {
    setGenre(newGenre);
  };

  if (pageLoading) {
    return <Loader />;
  }

  return (
    <div className='games_page'>
      <h1 className='games_page__title'>All games</h1>

      <GenreSelect onGenreChange={handleGenreChange} />

      <CardList />

      <Pagination gamesCount={gamesCount} />
    </div>
  );
};
