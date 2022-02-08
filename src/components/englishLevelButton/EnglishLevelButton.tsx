import React from 'react';
import { ILevelBtnProps } from '../../types/types';
import './englishLevelButton.css';

const EnglishLevelButton: React.FC<ILevelBtnProps> = (props: ILevelBtnProps) => {

  return (
    <button className="level-button">
      <span className="level-short">{props.level}</span>
      <p className="level-title">{props.title}</p>
    </button>
  )
}

export default EnglishLevelButton;