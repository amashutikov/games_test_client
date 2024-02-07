import { useEffect, useState } from 'react';
import './NewsComponent.scss';
import { News } from '../../types/News';
import { getNewsById } from '../../api/news';
import { useParams } from 'react-router-dom';

export const NewsComponent = () => {
  const [news, setNews] = useState<News | undefined>(undefined);

  const { newsId } = useParams();

  console.log(newsId);

  useEffect(() => {
    getNewsById('65c234c0679bb802b0c55d48').then((res) => {
      setNews(res);
    });
  }, []);

  if (!news) {
    return null;
  }

  return (
    <div className='news'>
      <h1 className='news__title'>{news.title}</h1>
      <img
        className='news__image'
        src={news.title_image}
        alt='news title image'
      />
      <div
        className='news__body'
        dangerouslySetInnerHTML={{ __html: news?.body }}
      ></div>
    </div>
  );
};
