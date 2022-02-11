import React from 'react';
import { ILevelBtnProps, WordsType } from '../../types/types';
import './englishLevelButton.css';
import { Classes } from '../../types/enums';
import { getWords } from '../../requests/getWords';
import { setWords } from '../../localStorage/setWords';

const EnglishLevelButton: React.FC<ILevelBtnProps> = (props: ILevelBtnProps) => {

  const setWordsOnLocalStorage = (group: number, page: number): void => {
    getWords(group, page).then((wordsArr: Array<WordsType>) => {
      setWords(wordsArr);
    });
  }

  return (
    <button onClick={() => setWordsOnLocalStorage(props.group, props.page)} className={`${Classes.bookLevelDefault} ${props.color}`}>
      <span className={Classes.bookLevelShort}>{props.level}</span>
      <p className={Classes.bookLevelTitle}>{props.title}</p>
    </button>
  )
}

export default EnglishLevelButton;