import React from 'react';
import './authorizationForm.css';
import { useDispatch } from 'react-redux';
import { createUser } from '../../store/asyncActions';

const AuthorizationForm: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className='authorization-form'>
      <input className='authorization-name text-default' type="text" name="name" id="name" placeholder="Имя" />
      <input className='authorization-email text-default' type="email" name="email" id="email" placeholder="Email" />
      <input className='authorization-password text-default' type="password" name="password" id="pass" placeholder="Пароль" />
      <div className="authorization-buttons">
        <button className="authorization-login button-default">Войти</button>
        <button onClick={() => dispatch(createUser())} className="authorization-signin button-default">Регестрация</button>
      </div>
    </div>
  )
}

export default AuthorizationForm;