import React from 'react';
import { ILevelBtnProps } from '../../types/types';
import './englishLevelButton.css';
import { Classes } from '../../types/enums';

const EnglishLevelButton: React.FC<ILevelBtnProps> = (props: ILevelBtnProps) => {

  return (
    <button className={`${Classes.bookLevelDefault} ${props.color}`}>
      <span className={Classes.bookLevelShort}>{props.level}</span>
      <p className={Classes.bookLevelTitle}>{props.title}</p>
    </button>
  )
}

export default EnglishLevelButton;