import { Link } from 'react-router-dom';
import './games.css';

export const Games: React.FC = () => {
  return (
    <div className="games-wrapper">
      <nav className="nav-game">
        <ul>
          <li className="nav-game__li">
            <Link className="nav-game_link" to="/sprint"></Link>
          </li>
          <li className="nav-game__li">
            <Link id="audioChallenge-link" className="nav-game_link" to="/audioCall"></Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
