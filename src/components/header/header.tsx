import React from 'react';
import { Link } from 'react-router-dom';
import UnitedKingdom from '../../assets/header/united-kingdom.png';
import Button from 'antd/lib/button';
import {
  LoginOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons/lib/icons';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { menuSlice } from '../../store/reducers/menuSlice';
import { useCookies } from 'react-cookie';
import { authSlice } from '../../store/asyncReducers/authSlice';
import './Header.sass';

export const Header: React.FC = () => {
  const [, , removeCookie] = useCookies(['name', 'token', 'refreshToken', 'userId']);
  const { isShowMenu } = useAppSelector((state) => state.menuSlice);
  const { isLogin, user } = useAppSelector((state) => state.authSlice);
  const { deleteUser } = authSlice.actions;
  const dispatch = useAppDispatch();

  const handleShowMenu = () => {
    dispatch(menuSlice.actions.toggleMenu());
  };

  const logOut = () => {
    removeCookie('name');
    removeCookie('token');
    removeCookie('refreshToken');
    removeCookie('userId');
    dispatch(deleteUser());
    dispatch(authSlice.actions.setIsLogin(false));
  };

  return (
    <>
      <header className="header">
        <button className="header__menu_btn" onClick={handleShowMenu}>
          {isShowMenu ? (
            <MenuFoldOutlined style={{ fontSize: '25px' }} />
          ) : (
            <MenuUnfoldOutlined style={{ fontSize: '25px' }} />
          )}
        </button>
        <div className="header__title">
          <span className="header__title-1">RS •</span>
          <span className="header__title-2">Lang</span>
          <Link className="header__title-logo" to="/">
            <img src={UnitedKingdom} alt="United Kingdom" />
          </Link>
          <span>изучай английский играючи</span>
        </div>
        <div className="header__buttons">
          {isLogin && user ? (
            <>
              <p className="header__buttons-title">
                Здравствуйте <span>{user.name}</span>
              </p>
              <Button
                className="header__buttons-btn"
                type="primary"
                icon={<LogoutOutlined />}
                size="middle"
                onClick={logOut}
              >
                Выйти
              </Button>
            </>
          ) : (
            <Link to="/authorization">
              <Button
                className="header__buttons-btn"
                type="primary"
                icon={<LoginOutlined />}
                size="middle"
              >
                Авторизация
              </Button>
            </Link>
          )}
        </div>
      </header>
    </>
  );
};
