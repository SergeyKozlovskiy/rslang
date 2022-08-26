import { CaretRightOutlined } from '@ant-design/icons';
import Button from 'antd/lib/button';
import React from 'react';
import { Link } from 'react-router-dom';
import './Main.sass';

export const Main: React.FC = () => (
  <main className="main">
    <div className="blur-block"></div>
    <div className="main__text">
      <h1 className="main__text-header">
        Добро пожаловать в <br></br>
        <span className="main__text-header-span1">RS • </span>
        <span className="main__text-header-span2">Lang</span>
      </h1>
      <p className="main__text-subtitle">
        Уровень твоего <span>English</span> останавливается на
        <span> London is the capital of Great Britan</span> ? Не переживай, с нашим приложением ты
        можешь изучать язык как в привычном формате словаря, так и играя. Скорее жми кнопку
        &quot;Начать&quot;!
      </p>
      <Link to="/games">
        <Button className="main__btn" icon={<CaretRightOutlined />} type="primary" size={'large'}>
          Начать
        </Button>
      </Link>
    </div>
  </main>
);
