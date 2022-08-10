import { NavigationPage } from '../../components/NavigationPage/NavigationPage';
import { Title } from '../../components/Title/Title';
import './Games.sass';

export const Games: React.FC = () => {
  return (
    <>
      <Title text="Игры" />
      <NavigationPage classEl="games" path_1="/sprint" path_2="/audioChallenge" />
    </>
  );
};
