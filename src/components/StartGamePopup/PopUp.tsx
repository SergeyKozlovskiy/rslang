import Button from 'antd/lib/button/button';
import { useNavigate } from 'react-router';
import './PopUp.sass';

export const PopUp: React.FC<{ header: string; subtitle: string; callback: () => void }> = ({
  header,
  subtitle,
  callback,
}) => {
  const navigate = useNavigate();
  const comeBack = () => {
    navigate('../games');
  };
  return (
    <div className="startGame-popup">
      <h3 className="startGame-popup__title">{header}</h3>
      <p className="startGame-popup__subtitle">{subtitle}</p>
      <div className="startGame-popup__buttons">
        <Button onClick={callback} className="startGame-popup__buttons-item" type="primary">
          Начать
        </Button>
        <Button onClick={comeBack} className="startGame-popup__buttons-item" type="primary">
          Вернуться
        </Button>
      </div>
    </div>
  );
};
