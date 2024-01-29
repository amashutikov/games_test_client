import './CardCarousel.scss';
import { Card } from '../Card/Card';
import { useSearchParams } from 'react-router-dom';

export const CardCarousel = () => {
  const [, setSearchParams] = useSearchParams();

  const handleCardClick = (gameId: number) => {
    setSearchParams((params) => {
      const updatedParams = new URLSearchParams(params);
      updatedParams.set('gameId', String(gameId));
      return updatedParams;
    });
  };

  const game = {
    id: 88973,
    artworks: [
      {
        id: 14689,
        alpha_channel: false,
        animated: false,
        game: 88973,
        height: 1080,
        image_id: 'arbc1',
        url: '//images.igdb.com/igdb/image/upload/t_thumb/arbc1.jpg',
        width: 1920,
        checksum: 'ef4ff28f-dcf4-dc07-79eb-7c2cc08a7d8a',
      },
    ],
    cover: {
      id: 92497,
      alpha_channel: false,
      animated: false,
      game: 88973,
      height: 800,
      image_id: 'co1zdd',
      url: '//images.igdb.com/igdb/image/upload/t_thumb/co1zdd.jpg',
      width: 600,
      checksum: '4519fbae-714a-5b81-17cf-151df9907998',
    },
    name: 'Goblin Sword',
    slug: 'goblin-sword',
    summary:
      'Goblin Sword is a retro-inspired action platformer with light rpg elements.\n\nAn army of monsters led by an evil wizard have invaded your hometown. Slay as many monsters as you can, collect loot, avoid dangerous traps and defeat menacing bosses, before facing the evil wizard himself.\n\nReviews:\n“It\'s such a crazy value and has such good production quality it kind of speaks for itself.” 5/5 TouchArcade\n"Fun visuals, good music, engaging level design, and lots of content make Goblin Sword an excellent little game." Editor\'s Choice -148 Apps\n“A deeply compelling and staggeringly impressive tribute to retro games.” 10/10 ArcadeLife\n\nFeatures:\n-89 levels\n-13 bosses\n-30 weapons with unique special attacks\n-30 relics that grant you abilities\n-14 costumes\n-8 guardians that follow you around and assist you\n-5 secret very hard levels\n-Decorate your home with souvenirs\n-Customizable touch controls\n-Universal app. Works on iPad, iPhone and iPod touch.\n-iCloud and MFi support\n-Game Center achievements and leaderboards\n-Premium game. No IAP or ads ever.',
  };

  return (
    <>
      <Card game={game} onClick={handleCardClick} />
    </>
  );
};
