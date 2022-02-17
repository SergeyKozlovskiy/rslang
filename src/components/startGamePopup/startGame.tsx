import { Button } from 'react-bootstrap';
import { Text } from '../../types/enums'
import './startGame.css';
export const StartGame: React.FC<{header: string, subtitle: string, callback: Function}> = ({header, subtitle, callback}) => {
  return <div className="startGame-popup">
      <h3>{header}</h3>
      <p>{subtitle}</p>
      <Button onClick={() => {callback()}} className='startGame-popup_btn' variant="success">{Text.StartGametButton}</Button>
    </div>

};