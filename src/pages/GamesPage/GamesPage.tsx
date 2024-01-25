import { useState, useEffect } from 'react';
import './GamesPage.scss';
import { CardList } from '../../components/CardList/CardList';
import { Oval } from 'react-loader-spinner';
import { GenreSelect } from '../../components/GenreSelect/GenreSelect';
import { getGames } from '../../api/games';
import { useDispatch } from 'react-redux';
import { actions as gamesToShowActions } from '../../store/gamesToShow';
import { Loader } from '../../components/Loader/Loader';
import { verify } from '../../utils/verify';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Pagination } from '../../components/Pagination/Pagination';

export const GamesPage = () => {
  const [searchParams] = useSearchParams();

  const [page, setPage] = useState(0);
  const [loadingMoreGames, setLoadingMoreGames] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [genre, setGenre] = useState(
    searchParams.get('gameGenre') || 'All genres'
  );

  const navigate = useNavigate();

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
      setLoadingMoreGames(false);
    });
  }, [page, genre]);

  const handleDownloadMoreGames = () => {
    setPage((prev) => prev + 1);
    setLoadingMoreGames(true);
  };

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

      <button className='games_page__button' onClick={handleDownloadMoreGames}>
        {loadingMoreGames ? (
          <Oval
            height={30}
            width={30}
            color='#4fa94d'
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor='#4fa94d'
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        ) : (
          'Load more'
        )}
      </button>
      <Pagination />
    </div>
  );
};
