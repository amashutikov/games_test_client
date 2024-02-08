import './NewsLine.scss';
import { News } from '../../types/News';
import { Link } from 'react-router-dom';

type Props = {
  news: News;
};

export const NewsLine: React.FC<Props> = ({ news }) => {
  return (
    <Link to={`/news/${news._id}`} className='custom-link'>
      <div className='news_line'>
        <img
          src={news.title_image}
          alt='title image'
          className='news_line__image'
        />
        <div className='news_line__info'>
          <h3 className='news_line__title'>{news.title}</h3>
          <p className='news_line__time'>Posted 3 hours ago</p>
        </div>
      </div>
    </Link>
  );
};
