import { Button } from 'antd';
import { useNavigate } from 'react-router';

export const DetailWordButtons: React.FC<{
  handleClickButton: () => void;
  textButton: string;
  textLink: string;
  path: string;
}> = ({ handleClickButton, textButton, textLink, path }) => {
  const navigate = useNavigate();

  const handleClickLink = () => {
    navigate(path, { replace: true });
  };

  return (
    <div className="words-info__buttons">
      <Button onClick={handleClickButton} className="words-info__buttons-item" type="primary">
        {textButton}
      </Button>
      <Button onClick={handleClickLink} className="words-info__buttons-item" type="primary">
        {textLink}
      </Button>
    </div>
  );
};
