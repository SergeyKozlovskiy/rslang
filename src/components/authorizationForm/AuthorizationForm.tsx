import React, { useState } from 'react';
import './authorizationForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../store/asyncActions';
import { signInUser } from '../../store/asyncActions';

const AuthorizationForm: React.FC = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  const [login, setLogin] = useState(false);

  return (
    <div className='authorization-form'>
      <button onClick={() => console.log(state)}>State</button>
      {
        login === true ? 
          <input className='authorization-name text-default' type="text" name="name" id="name" placeholder="Имя" />
        : 
          ''
      }
      <input className='authorization-email text-default' type="email" name="email" id="email" placeholder="Email" />
      <input className='authorization-password text-default' type="password" name="password" id="pass" placeholder="Пароль" />
      <div className="authorization-buttons">
        {
          login === true ? 
            <button onClick={() => dispatch(createUser())} className="authorization-signin button-default">Регестрация</button>
          :     
            <button onClick={() => dispatch(signInUser())} className="authorization-login button-default">Войти</button>
        }
        <div className="authorization-text">
          {
            login === true 
            ? 
            <span onClick={() => setLogin(false)}>Назад</span>
            :
            <p>Ещё нет аккаунта? Тогда <span onClick={()=> setLogin(true)}>зарегестриутесь!</span></p>
          } 
        </div>
      </div>
    </div>
  )
}

export default AuthorizationForm;