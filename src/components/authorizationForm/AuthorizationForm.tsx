import React, { useState } from 'react';
import './authorizationForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, signInUser } from '../../store/asyncActions';
import { IReduxState } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import { Text } from '../../types/enums';

const AuthorizationForm: React.FC = () => {
  const dispatch = useDispatch();
  const state: IReduxState = useSelector((state: IReduxState) => state);

  const navigate = useNavigate();
  if(state.IsLogin) {
    navigate('/')
  }

  const [login, setLogin] = useState(false);

  return (
    <div className='authorization-form'>
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
            <button onClick={() => dispatch(createUser())} className="authorization-signin button-default">{Text.authorizationRegBtn}</button>
          :     
            <button onClick={() => dispatch(signInUser())} className="authorization-login button-default">{Text.authorizationLogBtn}</button>
        }
        <div className="authorization-text">
          {
            login === true 
            ? 
            <span onClick={() => setLogin(false)}>{Text.authorizationBackBtn}</span>
            :
            <p>{Text.authorizationRegText} <span onClick={()=> setLogin(true)}>{Text.authorizationRegLink}</span></p>
          } 
        </div>
      </div>
    </div>
  )
}

export default AuthorizationForm;