import React from 'react';
import './main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Text } from '../../types/enums';
import { Classes } from '../../types/enums';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Main: React.FC = () => (
  <main className={Classes.mainStartPage} >
    <div className="main-text">
      <h1 className="main-greetings">
        {Text.mainGreetingPartOne} <span className={Classes.mainGreetingSpanOne}>{Text.mainRsSpan}</span><span className={Classes.mainGreetingSpanTwo}>{Text.mainGreetingPartTwo}</span>
      </h1>
      <p className="main-promo">
        {Text.mainPromoPartOne} <span>{Text.mainPromoSpanOne}</span> {Text.mainPromoPartTwo} <span>{Text.mainPromoSpanTwo}</span> {Text.mainPromoPartThree}
      </p>
      <Link to="/games"><Button as="input" type="button" value="Начать" className={Classes.mainStartButton} /></Link>
    </div>
  </main>
 );