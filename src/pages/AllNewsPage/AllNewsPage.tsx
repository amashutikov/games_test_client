import './AllNewsPage.scss';
import { useEffect, useState } from 'react';
import { News } from '../../types/News';
import { getNews } from '../../api/news';
import { NewsLine } from '../../components/NewsLine/NewsLine';
import { Loader } from '../../components/Loader/Loader';
import { Pagination } from '../../components/Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';

export const AllNewsPage = () => {
  const [searchParams] = useSearchParams();

  const [pageLoading, setPageLoading] = useState(true);
  const [news, setNews] = useState<News[] | undefined>(undefined);
  const [page, setPage] = useState(
    searchParams.get('page') ? Number(searchParams.get('page')) : 1
  );

  useEffect(() => {
    if (Number(searchParams.get('page')) !== page) {
      setPageLoading(true);

      setPage(searchParams.get('page') ? Number(searchParams.get('page')) : 1);
    }
  }, [searchParams]);

  useEffect(() => {
    getNews(10, (page - 1) * 10).then((res) => {
      setNews(res);
      setPageLoading(false);
    });
  }, [page]);

  return (
    <div className='all_news_page'>
      <h1 className='all_news_page__title'>
        Here you can browse most resent gaming news
      </h1>
      {pageLoading ? (
        <Loader />
      ) : (
        news?.map((item) => <NewsLine news={item} key={item._id} />)
      )}

      <Pagination count={50} itemsPerPage={10} />
    </div>
  );
};
