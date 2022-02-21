import { SyntheticEvent } from "react";
import { CloseButton, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import fullScreen from '../../assets/svg/fullscreen.svg';
import fullScreenExit from '../../assets/svg/fullscreen-exit.svg';
import './settingsGame.css';
import { EnglishLevels } from "../../types/enums";

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
      <option value="0">{EnglishLevels.A1} {EnglishLevels.ELEMENTARY}</option>
      <option value="1">{EnglishLevels.A2} {EnglishLevels.PRE_INTERMEDIATE}</option>
      <option value="2">{EnglishLevels.B1} {EnglishLevels.INTERMEDIATE}</option>
      <option value="3">{EnglishLevels.B2} {EnglishLevels.UPPER_INTERMEDIATE}</option>
      <option value="4">{EnglishLevels.C1} {EnglishLevels.ADVANCED}</option>
      <option value="5">{EnglishLevels.C2} {EnglishLevels.PROFICIENCY}</option>
    </Form.Select>
  <Link to="/games"><CloseButton className="exit-game" /></Link>
</div>
};