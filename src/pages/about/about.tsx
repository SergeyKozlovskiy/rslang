import React from 'react';
import './about.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Text } from '../../types/enums';
import { Classes } from '../../types/enums';
import image from '../../assets/about/image.jpg';

export const About: React.FC = () => (
  <main className={Classes.mainStartPage} >
        {Text.aboutPageTitle} 
        <div className='aboutPageContainer'>
            <div className='aboutPageDevCard'><img src={image} className='aboutPageDevCardImage' alt='Сергей Козловский'></img><h2 className='aboutPageDevCardTitle'>Сергей Козловский</h2><span className='aboutPageDevCardPosition'>Team Lead</span>Ежедневная связь с командой, постановка/контроль тасков, настройка роутинга и получения данных с бекенда через Redux, создание игр "Спринт" и "Аудио-вызов".</div>
            <div className='aboutPageDevCard'><img src={image} className='aboutPageDevCardImage' alt='Павел Войтехович'></img><h2 className='aboutPageDevCardTitle'>Павел Войтехович</h2><span className='aboutPageDevCardPosition'>Lead Dev</span>Настройка получения/отправки данных на сервер через Redux, реализация регистрации и авторизации пользователя, создание учебника и списка слов.</div>
            <div className='aboutPageDevCard'><img className='aboutPageDevCardImage' src={image} alt='Тимур Щербина'></img><h2 className='aboutPageDevCardTitle'>Тимур Щербина</h2><span className='aboutPageDevCardPosition'>Dev</span>Верстка, графическое оформление, создание бургер-меню.</div>
        </div>
  </main>
 );