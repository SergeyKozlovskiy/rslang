import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

export const Header: React.FC = () => {
  const showMenu = () => {
    (document.getElementById("Menu_list") as HTMLFormElement).classList.toggle("Menu-active");
  };
  return <header>
    <nav className="nav" id="Navigation">
      <Button variant="outline-warning" className="Menu-button" onClick={showMenu} ></Button>
      <ul id="Menu_list" className="Menu">
        <li ><Link className="Menu-option" to="/">Start Page</Link></li>
        <li><Link className="Menu-option" to="/authorization">Login Page</Link></li>
        <li><Link className="Menu-option" to="/book">Word List Page</Link></li>
        <li><Link className="Menu-option" to="/games">Mini Games Page</Link></li>
        <li><Link className="Menu-option" to="/statistics">Stat Page</Link></li>
      </ul>
    </nav>
    <div className="header_app-name">RS•<span>Lang</span><span>learn english with pleasure</span></div>
    <Button as="input" type="button" value="Log in" className="Log-in-button" />
    </header>
};
    
    