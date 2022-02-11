import { Link } from 'react-router-dom';
import './games.css';
export const Games: React.FC = () => {
  return <div className="games-wrapper">
        <nav className="nav-game" >
          <ul>
            <li><Link className="nav-game_link" to="/sprint">Sprint</Link></li>
            <li><Link className="nav-game_link" to="/audioCall">AudioCall</Link></li>
          </ul>
        </nav>
  </div>
};