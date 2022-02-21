import React, { useState } from 'react';
import './authorizationForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, signInUser } from '../../store/asyncActions';
import { IReduxState } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import { Text, Classes } from '../../types/enums';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AuthorizationForm: React.FC = () => {
  const dispatch = useDispatch();
  const state: IReduxState = useSelector((state: IReduxState) => state);

  const navigate = useNavigate();
  if(state.IsLogin) {
    navigate('/')
  }

  const [login, setLogin] = useState(false);

  return (
    <Form>
      {
        login === true ? 
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>{Text.authorizationName}</Form.Label>
            <Form.Control className={Classes.nameInput} type="text" placeholder="Имя" />
          </Form.Group>
        : 
          ''
      }
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>{Text.authorizationEmail}</Form.Label>
        <Form.Control className={Classes.emailInput} type="email" placeholder="Email" />
        <Form.Text className="text-muted">
          {Text.authorizationEmailSmal}
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>{Text.authorizationPassword}</Form.Label>
        <Form.Control className={Classes.passInput} type="password" placeholder="Пароль" />
      </Form.Group>
      {
        login === true ? 
          <Button className="log-in-button" onClick={() => dispatch(createUser())} variant="primary">
            {Text.authorizationRegBtn}
          </Button>
        :     
          <Button className="log-in-button" onClick={() => dispatch(signInUser())} variant="primary">
            {Text.loginButtonValue}
          </Button>
      }
      {
        login === true 
        ? 
        <p className={Classes.formBack}><span onClick={() => setLogin(false)}>{Text.authorizationBackBtn}</span></p>
        :
        <p className={Classes.formReg}>{Text.authorizationRegText} <span onClick={()=> setLogin(true)}>{Text.authorizationRegLink}</span></p>
      } 
    </Form>
  )
}

export default AuthorizationForm;