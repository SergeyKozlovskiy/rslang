import React from 'react';
import './main.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Text } from '../../types/enums';
import { Classes } from '../../types/enums'

export const Main: React.FC = () => (
  <main className={Classes.mainStartPage} >
  <button className={Classes.mainStartButton}>{Text.mainStartButtonValue}</button>
  
  
  
  
  
  </main>
 );