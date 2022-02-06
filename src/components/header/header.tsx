import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Text } from '../../types/enums';
import { Classes } from '../../types/enums';
import { IReduxState } from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUserAction } from '../../store/actions';
import { getUserInfo } from '../../localStorage/getUserInfo';
import { IRespSignIn } from '../../types/types';

export const Header: React.FC = () => {
  const showMenu = () => {
    (document.getElementById("Menu_list") as HTMLFormElement).classList.toggle("Menu-active");
  };

  const dispatch = useDispatch();

  const state: IReduxState = useSelector((state: IReduxState) => state);

  const userInfoFromLocal: IRespSignIn | null = getUserInfo();

  return <header className={Classes.headerContainer }>
    <nav className={Classes.menuContainer } id="Navigation">
      <Button variant="outline-warning" className={Classes.menuButton} onClick={showMenu} ></Button>
      <ul id="Menu_list" className={Classes.menuList}>
        <li className={Classes.menuListItem}><Link className={Classes.menuListItemOption} to="/">{Text.menuOptionStartPage}</Link></li>
        {
          state.IsLogin === false
          ?
          <li className={Classes.menuListItem}><Link className={Classes.menuListItemOption} to="/authorization">{Text.menuOptionLoginPage}</Link></li>
          :
          ''
        }
        <li className={Classes.menuListItem}><Link className={Classes.menuListItemOption} to="/book">{Text.menuOptionWordList}</Link></li>
        <li className={Classes.menuListItem}><Link className={Classes.menuListItemOption} to="/games">{Text.menuOptionMiniGames}</Link></li>
        <li className={Classes.menuListItem}><Link className={Classes.menuListItemOption} to="/statistics">{Text.menuOptionStatPage}</Link></li>
      </ul>
    </nav>
    <div className={Classes.headerAppName}>{Text.headerAppName}<span className={Classes.headerAppNameSpan}>{Text.headerAppNameSpan}</span>
      <span className={Classes.headerAppNameMotto}>{Text.headerAppNameMotto}</span></div>
      {
        userInfoFromLocal !== null
        ? (
          state.userInfo = userInfoFromLocal,
          state.IsLogin = true,

          <div className='user-panel'>
            <h3 className='user-name'>{userInfoFromLocal.name}</h3>
            <Button onClick={() => dispatch(logoutUserAction())} as="input" type="button" value="выйти" className={Classes.loginButton} />
          </div>
          ) : (
          state.IsLogin === true && state.userInfo.name !== 'none'
          ? 
          <div className='user-panel'>
            <h3 className='user-name'>{state.userInfo.name}</h3>
            <Button onClick={() => dispatch(logoutUserAction())} as="input" type="button" value="выйти" className={Classes.loginButton} />
          </div>
          :
          <Link to="/authorization">
            <Button as="input" type="button" value={Text.loginButtonValue} className={Classes.loginButton} />
          </Link>
          )
      }
    </header>
};
    
    