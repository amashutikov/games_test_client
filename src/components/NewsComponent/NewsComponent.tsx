import './NewsComponent.scss';
import { News } from '../../types/News';

type Props = {
  news: News;
};

export const NewsComponent: React.FC<Props> = ({ news }) => {
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
