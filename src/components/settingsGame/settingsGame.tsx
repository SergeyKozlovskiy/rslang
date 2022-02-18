import { SyntheticEvent } from "react";
import { CloseButton, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import fullScreen from '../../assets/svg/fullscreen.svg';
import fullScreenExit from '../../assets/svg/fullscreen-exit.svg';
import './settingsGame.css';

export const SettingGame: React.FC<{changeLevel: Function}> = ({changeLevel}) => {
  const changeFullScreen = (event: SyntheticEvent) => {
    const target = event.target as HTMLImageElement;
   if (document.fullscreenElement) {
    document.exitFullscreen();
    target.setAttribute('src', fullScreen);
   } else {
    document.documentElement.requestFullscreen();
    target.setAttribute('src', fullScreenExit);
   }
  }

  return  <div className="game-settings">
  <button className='game-settings__btn'><img onClick={(e) => {changeFullScreen(e)}} src={fullScreen} alt={fullScreen}/></button>
    <Form.Select className="game-settings_level" onChange={(e) => {changeLevel(e.target.value)}}>
      <option value="0">Начальный</option>
      <option value="1">Элементарный</option>
      <option value="2">Слабый средний</option>
      <option value="3">Средний</option>
      <option value="4">Выше среднего</option>
      <option value="5">Продвинутый</option>
    </Form.Select>
  <Link to="/"><CloseButton /></Link>
</div>
};