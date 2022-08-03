import { useState } from 'react';
import { Select } from 'antd';
import { Link } from 'react-router-dom';
import fullScreen from '../../assets/svg/fullscreen.svg';
import fullScreenExit from '../../assets/svg/fullscreen-exit.svg';
import { levelArr } from '../../constants/arrays';
import { CloseOutlined } from '@ant-design/icons';
import './settingsGame.sass';

export const SettingGame: React.FC<{ changeLevel: (level: string) => void }> = ({
  changeLevel,
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
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
      <Select className="game-settings_level" defaultValue="Elementary" onChange={changeLevel}>
        {levelArr.map((level, i) => {
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
