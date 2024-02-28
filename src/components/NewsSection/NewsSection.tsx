import { useEffect, useState } from 'react';
import './NewsSection.scss';
import { News } from '../../types/News';
import { getNews } from '../../api/news';
import { Oval } from 'react-loader-spinner';

export const NewsSection = () => {
  const [news, setNews] = useState<News[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNews().then((res) => {
      setNews(res.news);
      setLoading(false);
    });
  }, []);

  return (
    <div className='news_section'>
      {loading && (
        <div className='news_section__loader'>
          <Oval
            height={50}
            width={50}
            color='#4fa94d'
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor='#4fa94d'
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      )}

      <div className='news_section__main'>
        {news && (
          <img
            src={news[0].title_image}
            alt='title image'
            className='news_section__main_image'
          />
        )}

        <h4 className='news_section__main_title'>{news && news[0].title}</h4>
      </div>
      <div className='news_section__secondary'>
        {news &&
          news.map((item, i) => {
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
