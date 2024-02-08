import { useEffect, useState } from 'react';
import './NewsSection.scss';
import { News } from '../../types/News';
import { getNews } from '../../api/news';

export const NewsSection = () => {
  const [news, setNews] = useState<News[] | undefined>(undefined);

  useEffect(() => {
    getNews().then((res) => setNews(res.news));
  }, []);

  if (!news) {
    return null;
  }

  return (
    <div className='news_section'>
      <div className='news_section__main'>
        <img
          src={news[0].title_image}
          alt='title image'
          className='news_section__main_image'
        />
        <h4 className='news_section__main_title'>{news[0].title}</h4>
      </div>
      <div className='news_section__secondary'>
        {news.map((item, i) => {
          if (i === 0) {
            return null;
          }
          return (
            <div key={item._id} className='news_section__secondary_container'>
              <img
                src={item.title_image}
                alt='title image'
                className='news_section__secondary_image'
              />
              <h4 className='news_section__secondary_title'>{item.title}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};
