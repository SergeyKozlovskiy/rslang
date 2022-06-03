import React, { useState } from 'react';
import './authorizationForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, signInUser } from '../../store/asyncActions';
import { IReduxState } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import { Text, Classes, MagicNumbers } from '../../types/enums';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AuthorizationForm: React.FC = () => {
  const dispatch = useDispatch();
  const state: IReduxState = useSelector((state: IReduxState) => state);

  const navigate = useNavigate();
  if (state.IsLogin) {
    navigate('/');
  }

  const [login, setLogin] = useState(false);
  const [isDisabled, setDisabled] = useState(true);

  const checkPasswordLength = () => {
    const passInput = document.querySelector('.password-input') as HTMLInputElement;
    if (
      passInput.value.length >= MagicNumbers.MIN_PASS_LENGTH &&
      passInput.value.length <= MagicNumbers.MAX_PASS_LENGTH
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  return (
    <Form>
      {login === true ? (
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>{Text.authorizationName}</Form.Label>
          <Form.Control className={Classes.nameInput} type="text" placeholder="Имя" />
        </Form.Group>
      ) : (
        ''
      )}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>{Text.authorizationEmail}</Form.Label>
        <Form.Control className={Classes.emailInput} type="email" placeholder="Email" />
        <Form.Text className="text-muted">{Text.authorizationEmailSmal}</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>{Text.authorizationPassword}</Form.Label>
        <Form.Control
          onChange={() => checkPasswordLength()}
          className={Classes.passInput}
          type="password"
          placeholder="Пароль (от 8 до 12 символов)"
        />
      </Form.Group>
      {login === true ? (
        <Button
          className="log-in-button"
          onClick={() => dispatch(createUser())}
          variant="primary"
          disabled={isDisabled}
        >
          {Text.authorizationRegBtn}
        </Button>
      ) : (
        <Button
          className="log-in-button"
          onClick={() => dispatch(signInUser())}
          variant="primary"
          disabled={isDisabled}
        >
          {Text.loginButtonValue}
        </Button>
      )}
      {login === true ? (
        <p className={Classes.formBack}>
          <span onClick={() => setLogin(false)}>{Text.authorizationBackBtn}</span>
        </p>
      ) : (
        <p className={Classes.formReg}>
          {Text.authorizationRegText}{' '}
          <span onClick={() => setLogin(true)}>{Text.authorizationRegLink}</span>
        </p>
      )}
    </Form>
  );
};

export default AuthorizationForm;
