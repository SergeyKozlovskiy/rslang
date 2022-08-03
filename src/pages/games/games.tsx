import { NavigationPage } from '../../components/navigationPage/NavigationPage';
import { Title } from '../../components/title/Title';
import './games.sass';

export const Games: React.FC = () => {
  return (
    <>
      <Title text="Игры" />
      <NavigationPage classEl="games" path_1="/sprint" path_2="/audioChallenge" />
    </>
  );
};
