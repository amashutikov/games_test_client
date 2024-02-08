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
import { getGenres } from '../../api/genres';
import { Genre } from '../../types/Genre';
import { getGenreId } from '../../helpers/getGenreId';

export const GamesPage = () => {
  const [searchParams] = useSearchParams();

  const [page, setPage] = useState(
    searchParams.get('page') ? Number(searchParams.get('page')) : 1
  );
  const [pageLoading, setPageLoading] = useState(true);
  const [genre, setGenre] = useState(searchParams.get('gameGenre') || null);
  const [gamesCount, setGamesCount] = useState(0);
  const [genres, setGenres] = useState<Genre[] | undefined>(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    if (Number(searchParams.get('page')) !== page) {
      setPage(searchParams.get('page') ? Number(searchParams.get('page')) : 1);
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

    getGenres().then((res) => {
      setGenres(res);
    });
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    setPageLoading(true);

    const genreId = String(getGenreId(genre, genres));

    getGames(page, genreId).then((res) => {
      dispatch(gamesToShowActions.replace(res));
      setPageLoading(false);
    });
  }, [page, genre]);

  useEffect(() => {
    const genreId = String(getGenreId(genre, genres));

    getAmountOfGames(page, genreId).then((res) => setGamesCount(Number(res)));
  }, [genre]);

  const handleGenreChange = (newGenre: string) => {
    setGenre(newGenre);
  };

  return (
    <div className='games_page'>
      {pageLoading && <Loader />}
      <h1 className='games_page__title'>All games</h1>

      <GenreSelect onGenreChange={handleGenreChange} genres={genres} />

      <CardList />

      <Pagination count={gamesCount} itemsPerPage={24} />
    </div>
  );
};
