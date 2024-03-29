import { useState } from 'react';
import { Select } from 'antd';
import { Link } from 'react-router-dom';
import fullScreen from '../../assets/svg/fullscreen.svg';
import fullScreenExit from '../../assets/svg/fullscreen-exit.svg';
import { levels } from '../../utils/arrays';
import { CloseOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../hooks/redux';
import './SettingsGame.sass';

export const SettingGame: React.FC<{ isGame: boolean; changeLevel: (level: string) => void }> = ({
  isGame,
  changeLevel,
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { EnglishLevel } = useAppSelector((state) => state.wordsSlice);
  const { Option } = Select;

  const changeFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    isFullScreen ? document.exitFullscreen() : document.documentElement.requestFullscreen();
  };

  return (
    <div className="game-settings">
      <button className="game-settings__btn">
        <img
          onClick={changeFullScreen}
          src={isFullScreen ? fullScreenExit : fullScreen}
          alt={fullScreen}
        />
      </button>
      <Select
        className="game-settings_level"
        defaultValue={levels[EnglishLevel]}
        onChange={changeLevel}
        disabled={isGame ? true : false}
      >
        {levels.map((level, i) => {
          return (
            <Option value={level} key={level + i}>
              {level}
            </Option>
          );
        })}
      </Select>
      <Link to="/games">
        <CloseOutlined className="exit-game" />
      </Link>
    </div>
  );
};
