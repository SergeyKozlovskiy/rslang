import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Text } from '../../types/enums';
import { Classes } from '../../types/enums'

export const Header: React.FC = () => {
  const showMenu = () => {
    (document.getElementById("Menu_list") as HTMLFormElement).classList.toggle("Menu-active");
  };
  return <header className={Classes.headerContainer }>
    <nav className={Classes.menuContainer } id="Navigation">
      <Button variant="outline-warning" className={Classes.menuButton} onClick={showMenu} ></Button>
      <ul id="Menu_list" className={Classes.menuList}>
        <li className={Classes.menuListItem}><Link className={Classes.menuListItemOption} to="/">{Text.menuOptionStartPage}</Link></li>
        <li className={Classes.menuListItem}><Link className={Classes.menuListItemOption} to="/authorization">{Text.menuOptionLoginPage}</Link></li>
        <li className={Classes.menuListItem}><Link className={Classes.menuListItemOption} to="/book">{Text.menuOptionWordList}</Link></li>
        <li className={Classes.menuListItem}><Link className={Classes.menuListItemOption} to="/games">{Text.menuOptionMiniGames}</Link></li>
        <li className={Classes.menuListItem}><Link className={Classes.menuListItemOption} to="/statistics">{Text.menuOptionStatPage}</Link></li>
      </ul>
    </nav>
    <div className={Classes.headerAppName}>{Text.headerAppName}<span className={Classes.headerAppNameSpan}>{Text.headerAppNameSpan}</span>
      <span className={Classes.headerAppNameMotto}>{Text.headerAppNameMotto}</span></div>
    <Button as="input" type="button" value={Text.loginButtonValue} className={Classes.loginButton} />
    </header>
};
    
    