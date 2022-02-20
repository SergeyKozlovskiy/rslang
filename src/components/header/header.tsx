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
import HomeIcon from '../../assets/svg/menu-home.svg';
import LoginIcon from '../../assets/svg/menu-login.svg';
import TextbookIcon from '../../assets/svg/menu-textbook.svg';
import VocabularyIcon from '../../assets/svg/menu-vocabulary.svg';
import GamesIcon from '../../assets/svg/menu-games.svg';
import StatisticsIcon from '../../assets/svg/menu-statistics.svg';
import AboutIcon from '../../assets/svg/menu-about.svg';

export const Header: React.FC = () => {
  const showMenu = () => {
    (document.getElementById("menu_list") as HTMLFormElement).classList.toggle("menu-active");
    (document.querySelector(".app-menu-layer") as HTMLFormElement).classList.toggle("app-menu-layer-active"); 
    hideMenu();
  };

  const hideMenu = () => {
    return document.addEventListener("click", function (event) {
      if ((event.target !== document.getElementById("menu_list") as HTMLFormElement) &&
        (event.target !== document.querySelector("Button") as HTMLFormElement) &&
        (document.getElementById("menu_list") as HTMLFormElement).classList.contains("menu-active"))
      {
        (document.getElementById("menu_list") as HTMLFormElement).classList.remove("menu-active");
        (document.querySelector(".app-menu-layer") as HTMLFormElement).classList.remove("app-menu-layer-active");
    }
    })
  };

  const dispatch = useDispatch();

  const state: IReduxState = useSelector((state: IReduxState) => state);

  const userInfoFromLocal: IRespSignIn | null = getUserInfo();

  return <header className={Classes.header}>
    <nav className={Classes.menuContainer} id="Navigation">
      <Button variant="outline-warning" className={Classes.menuButton} onClick={showMenu}></Button>
      <ul id="menu_list" className={Classes.menuList}>
        <CloseButton variant="white" className={Classes.menuListCloseButton} onClick={showMenu}></CloseButton>
        <li className={Classes.menuListItem}><Link className={Classes.menuListItemOption} to="/" onClick={showMenu}><img alt="home" src={HomeIcon}></img>&nbsp;{Text.menuOptionStartPage}</Link></li>
        {
          state.IsLogin === false
            ?
            <li className={Classes.menuListItem}><Link className={Classes.menuListItemOption} to="/authorization" onClick={showMenu}><img alt="Login" src={LoginIcon}></img>&nbsp;{Text.menuOptionLoginPage}</Link></li>
            :
            ''
        }
        <li className={Classes.menuListItem}><Link className={Classes.menuListItemOption} to="/book" onClick={showMenu}><img alt="Vocabulary" src={TextbookIcon}></img>&nbsp;{Text.menuOptionTextbook}</Link></li>
        <li className={Classes.menuListItem}><Link className={Classes.menuListItemOption} to="/dictionary" onClick={showMenu}><img alt="Vocabulary" src={VocabularyIcon}></img>&nbsp;{Text.menuOptionVocabulary}</Link></li>
        <li className={Classes.menuListItem}><Link className={Classes.menuListItemOption} to="/games" onClick={showMenu}><img alt="Games" src={GamesIcon}></img>&nbsp;{Text.menuOptionMiniGames}</Link></li>
        <li className={Classes.menuListItem}><Link className={Classes.menuListItemOption} to="/statistics" onClick={showMenu}><img alt="Statistics" src={StatisticsIcon}></img>&nbsp;&nbsp;{Text.menuOptionStatPage}</Link></li>
        <li className={Classes.menuListItem}><Link className={Classes.menuListItemOption} to="/about" onClick={showMenu}><img alt="About" src={AboutIcon}></img>&nbsp;&nbsp;&nbsp;&nbsp;{Text.menuOptionAbout}</Link></li>
      </ul>
    </nav >
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
  </header >
};