import { useState, useEffect } from 'react';
import './GamesPage.scss';
import { CardList } from '../../components/CardList/CardList';
import { GenreSelect } from '../../components/GenreSelect/GenreSelect';
import {
  getAmountOfGames,
  getAmountOfSearchedGames,
  getGames,
  getSearchedGames,
} from '../../api/games';
import { useDispatch } from 'react-redux';
import { actions as gamesToShowActions } from '../../store/gamesToShow';
import { Loader } from '../../components/Loader/Loader';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '../../components/Pagination/Pagination';
import { getGenres } from '../../api/genres';
import { Genre } from '../../types/Genre';
import { getGenreId } from '../../helpers/getGenreId';
import { SearchGames } from '../../components/SearchGames/SearchGames';

export const GamesPage = () => {
  const [searchParams] = useSearchParams();

  const [page, setPage] = useState(
    searchParams.get('page') ? Number(searchParams.get('page')) : 1
  );
  const [pageLoading, setPageLoading] = useState(true);
  const [genre, setGenre] = useState(searchParams.get('gameGenre') || null);
  const [search, setSearch] = useState(searchParams.get('search') || null);
  const [gamesCount, setGamesCount] = useState(0);
  const [genres, setGenres] = useState<Genre[] | undefined>(undefined);

  useEffect(() => {
    if (Number(searchParams.get('page')) !== page) {
      setPage(searchParams.get('page') ? Number(searchParams.get('page')) : 1);
    }

    setSearch(searchParams.get('search') || null);
  }, [searchParams]);

  useEffect(() => {
    getGenres().then((res) => {
      setGenres(res);
    });
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    setPageLoading(true);

    const genreId = String(getGenreId(genre, genres));

    if (search) {
      getSearchedGames(search, page).then((res) => {
        dispatch(gamesToShowActions.replace(res));
        setPageLoading(false);
      });

      getAmountOfSearchedGames(search, page).then((res) => {
        setGamesCount(Number(res.count));
      });

      return;
    }

    getGames(page, genreId).then((res) => {
      dispatch(gamesToShowActions.replace(res));
      setPageLoading(false);
    });

    getAmountOfGames(page, genreId).then((res) => setGamesCount(Number(res)));
  }, [page, genre, search]);

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

      <SearchGames />

      {!!searchParams.get('search') || (
        <GenreSelect onGenreChange={handleGenreChange} genres={genres} />
      )}

      <CardList />

      <Pagination count={gamesCount} itemsPerPage={24} />
    </div>
  );
};
