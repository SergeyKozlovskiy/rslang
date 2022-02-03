import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
export const Header: React.FC = () => {
  return <nav className="nav">
  <li><Link className="" to="/">главная страница</Link></li>
  <li><Link className="" to="/authorization">авторизация</Link></li>
  <li><Link className="" to="/book">электронный учебник</Link></li>
  <li><Link className="" to="/games">мини-игры</Link></li>
  <li><Link className="" to="/statistics">страница статистики</Link></li>
</nav>
};