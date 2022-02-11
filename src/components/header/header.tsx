import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { CloseButton } from 'react-bootstrap';
import { Text } from '../../types/enums';
import { Classes } from '../../types/enums';
import { IReduxState } from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUserAction } from '../../store/actions';
import { getUserInfo } from '../../localStorage/getUserInfo';
import { IRespSignIn } from '../../types/types';

export const Header: React.FC = () => {
  const showMenu = () => {
    (document.getElementById("menu_list") as HTMLFormElement).classList.toggle("menu-active");
  };

  const dispatch = useDispatch();

  const state: IReduxState = useSelector((state: IReduxState) => state);

  const userInfoFromLocal: IRespSignIn | null = getUserInfo();

  return <header className={Classes.header}>
    <nav className={Classes.menuContainer } id="Navigation">
      <Button variant="outline-warning" className={Classes.menuButton} onClick={showMenu} ></Button>
      <ul id="menu_list" className={Classes.menuList}>
        <CloseButton variant="white" className={Classes.menuListCloseButton} onClick={showMenu}></CloseButton>
        <li className={Classes.menuListItem}><Link className={Classes.menuListItemOption} to="/" onClick={showMenu}>{Text.menuOptionStartPage}</Link></li>
        {
          state.IsLogin === false
          ?
          <li className={Classes.menuListItem}><Link className={Classes.menuListItemOption} to="/authorization" onClick={showMenu}>{Text.menuOptionLoginPage}</Link></li>
          :
          ''
        }
        <li className={Classes.menuListItem}><Link className={Classes.menuListItemOption} to="/book" onClick={showMenu}>{Text.menuOptionElectronicBook}</Link></li>
        <li className={Classes.menuListItem}><Link className={Classes.menuListItemOption} to="/games" onClick={showMenu}>{Text.menuOptionMiniGames}</Link></li>
        <li className={Classes.menuListItem}><Link className={Classes.menuListItemOption} to="/statistics" onClick={showMenu}>{Text.menuOptionStatPage}</Link></li>
        <li className={Classes.menuListItem}><Link className={Classes.menuListItemOption} to="/about" onClick={showMenu}>{Text.menuOptionAbout}</Link></li>
      </ul>
    </nav>
    <Link className={Classes.headerAppName} to="/">{Text.headerAppName}
      <span className={Classes.headerAppNameSpan}>{Text.headerAppNameSpan}</span>
      <span className={Classes.headerAppNameMotto}>{Text.headerAppNameMotto}</span>
    </Link>
      {
        userInfoFromLocal !== null
        ? (
          state.userInfo = userInfoFromLocal,
          state.IsLogin = true,

          <div className={Classes.headerUserPanel}>
            <h3 className={Classes.headerUserName}>{userInfoFromLocal.name}</h3>
            <Button onClick={() => dispatch(logoutUserAction())} as="input" type="button" value={Text.headerUserExit} className={Classes.loginButton} />
          </div>
          ) : (
          state.IsLogin === true && state.userInfo.name !== Text.noneString
          ? 
          <div className={Classes.headerUserPanel}>
            <h3 className={Classes.headerUserName}>{state.userInfo.name}</h3>
            <Button onClick={() => dispatch(logoutUserAction())} as="input" type="button" value={Text.headerUserExit} className={Classes.loginButton} />
          </div>
          :
          <Link to="/authorization">
            <Button as="input" type="button" value={Text.loginButtonValue} className={Classes.loginButton} />
          </Link>
          )
      }
    </header>
};
    
    