import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'antd/lib/button';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Input } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { signIn, signUp, authSlice } from '../../store/asyncReducers/authSlice';
import preloader from '../../assets/preloader/preloader.svg';
import { useCookies } from 'react-cookie';
import { CaretLeftOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Time } from '../../types/enums';
import './authorizationForm.sass';

interface IFormInputs {
  name: string;
  email: string;
  password: string;
  remember: boolean;
}

const AuthorizationForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isShowMessage, setIsShowMessage] = useState(false);
  const [, setCookie] = useCookies(['name', 'token', 'refreshToken', 'userId']);
  const { isLoading, message } = useAppSelector((state) => state.authSlice);
  const { clearMessage } = authSlice.actions;
  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
    reset,
  } = useForm<IFormInputs>({
    mode: 'onBlur',
  });
  const [isRegistration, setIsRegistration] = useState(true);

  const hendleClickEnter = () => {
    setIsRegistration(!isRegistration);
  };

  const closeMessage = () => {
    setIsShowMessage(false);
    setTimeout(() => {
      dispatch(clearMessage());
    }, 500);
  };

  const handleSignIn = async (email: string, password: string) => {
    const result = await dispatch(signIn({ email, password }));
    if (result.meta.requestStatus === 'fulfilled') {
      setCookie('name', result.payload.name, { path: '/', maxAge: Time.FOUR_OCLOCK });
      setCookie('token', result.payload.token, { path: '/', maxAge: Time.FOUR_OCLOCK });
      setCookie('refreshToken', result.payload.refreshToken, {
        path: '/',
        maxAge: Time.FOUR_AND_HALF_HOURS,
      });
      setCookie('userId', result.payload.userId, { path: '/', maxAge: Time.FOUR_AND_HALF_HOURS });
      reset();
      navigate('/');
    } else {
      setIsShowMessage(true);
    }
  };

  const onSubmit: SubmitHandler<IFormInputs> = async ({ name, email, password }) => {
    if (isRegistration) {
      const result = await dispatch(signUp({ name, email, password }));
      console.log('регистрация');
      if (result.meta.requestStatus === 'fulfilled') {
        handleSignIn(email, password);
      } else {
        setIsShowMessage(true);
      }
    } else {
      handleSignIn(email, password);
    }
  };

  return (
    <>
      <h2 className="title">{isRegistration ? 'Регистрация' : 'Вход'}</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        {isRegistration ? (
          <Controller
            name="name"
            control={control}
            rules={{
              required: 'Поле обязательно к заполнению',
              minLength: {
                value: 2,
                message: 'Длинна имени должна быть от 2 до 16 символов',
              },
              maxLength: {
                value: 16,
                message: 'Длинна имени должна быть от 2 до 16 символов',
              },
              pattern: {
                value: /^([А-Я]{1}[а-яё]{1,}|[A-Z]{1}[a-z]{1,})$/,
                message:
                  'Имя должно: начинаться с большой буквы, состоять из букв кирриллицы или латинского алфавита, содержать только буквенные символы',
              },
            }}
            render={({ field }) => {
              return (
                <label>
                  Имя
                  <Input
                    placeholder="Введите имя"
                    {...field}
                    status={errors.name ? 'error' : undefined}
                  />
                  <div className="form-error">
                    {errors.name && <span>{errors.name.message || 'Ошибка'}</span>}
                  </div>
                </label>
              );
            }}
          />
        ) : null}

        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Поле обязательно к заполнению',
            minLength: {
              value: 4,
              message: 'Длинна почты должна быть от 4 до 8 символов',
            },
            maxLength: {
              value: 24,
              message: 'Длинна почты должна быть от 2 до 24 символов',
            },
            pattern: {
              value: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,})$/,
              message: 'Некорректная почта',
            },
          }}
          render={({ field }) => {
            return (
              <label>
                Почта
                <Input
                  placeholder="Введите вашу почту"
                  {...field}
                  status={errors.email ? 'error' : undefined}
                />
                <div className="form-error">
                  {errors.email && <span>{errors.email.message || 'Ошибка'}</span>}
                </div>
              </label>
            );
          }}
        />
        <Controller
          name="password"
          control={control}
          rules={{
            required: 'Поле обязательно к заполнению',
            minLength: {
              value: 8,
              message: 'Длинна пароля должна быть от 8 до 16 символов',
            },
            maxLength: {
              value: 16,
              message: 'Длинна пароля должна быть от 8 до 16 символов',
            },
            pattern: {
              value: /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g,
              message:
                'Пароль должен содержать: числа, латинские буквы в верхнем и нижнем регистре, спецсимволы',
            },
          }}
          render={({ field }) => {
            return (
              <label>
                Пароль
                <Input.Password
                  placeholder="Введите пароль"
                  {...field}
                  status={errors.password ? 'error' : undefined}
                />
                <div className="form-error">
                  {errors.password && <span>{errors.password.message || 'Ошибка'}</span>}
                </div>
              </label>
            );
          }}
        />
        <Button type="link" onClick={hendleClickEnter}>
          {isRegistration ? 'Войти' : 'Зарегестрироваться'}
        </Button>
        <Button disabled={!isValid} type="primary" htmlType="submit" className="form-btn">
          {isRegistration ? 'Зарегестрироваться' : 'Войти'}
        </Button>
      </form>
      {isLoading ? <img className="preloader" src={preloader} alt="Загрузка..."></img> : null}
      <div className={isShowMessage ? 'message-error active' : 'message-error'}>
        <span>{message}</span>
        <ExclamationCircleOutlined style={{ fontSize: '19px' }} />
        <button className="message-error__closeBtn" onClick={closeMessage}>
          <CaretLeftOutlined style={{ fontSize: '22px' }} />
        </button>
      </div>
    </>
  );
};

export default AuthorizationForm;
