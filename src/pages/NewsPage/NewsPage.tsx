import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getNewsById } from '../../api/news';
import { NewsComponent } from '../../components/NewsComponent/NewsComponent';
import { News } from '../../types/News';
import './NewsPage.scss';
import { Loader } from '../../components/Loader/Loader';

export const NewsPage = () => {
  const [news, setNews] = useState<News | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const { newsId } = useParams();

  useEffect(() => {
    console.log(loading);

    if (!newsId) {
      return;
    }

    getNewsById(newsId).then((res) => {
      setNews(res);
      setLoading(false);
    });
  }, []);

  return (
    <div className='news_page'>
      {loading && <Loader />}
      {news && <NewsComponent news={news} />}
    </div>
  );
};
