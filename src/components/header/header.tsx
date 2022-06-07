import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { CloseButton } from 'react-bootstrap';
import { Text } from '../../types/enums';
import { Classes } from '../../types/enums';
import { IReduxState } from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { IRespSignIn } from '../../types/types';
import UnitedKingdom from '../../assets/header/united-kingdom.png';
import Button from 'antd/lib/button';
import { LoginOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons/lib/icons';
import './header.sass';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { menuSlice } from '../../store/reducers/menuSlice';

export const Header: React.FC = () => {
  const { isShowMenu } = useAppSelector((state) => state.menuSlice);
  const dispatch = useAppDispatch();
  const handleShowMenu = () => {
    dispatch(menuSlice.actions.toggleMenu());
  };

  return (
    <header className="header">
      <button className="header__menu_btn" onClick={handleShowMenu}>
        {isShowMenu ? (
          <MenuFoldOutlined style={{ fontSize: '25px' }} />
        ) : (
          <MenuUnfoldOutlined style={{ fontSize: '25px' }} />
        )}
      </button>
      <div className="header__title">
        <span>RS • Lang</span>
        <Link className="header__title-logo" to="/">
          <img src={UnitedKingdom} alt="United Kingdom" />
        </Link>
        <span>изучай английский играючи</span>
      </div>
      <div className="header__buttons">
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
      </div>
    </header>
  );
};
