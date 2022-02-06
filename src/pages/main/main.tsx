import React from 'react';
import './main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Text } from '../../types/enums';
import { Classes } from '../../types/enums'

export const Main: React.FC = () => (
  <main className={Classes.mainStartPage} >
    <div className={Classes.mainStartPageContainer}>
      <button className={Classes.mainStartButton}>{Text.mainStartButtonValue}</button></div>
  </main>
 );