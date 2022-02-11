import React from 'react';
import { WordsType } from '../../../types/types';
import { getWordsFromLocal } from '../../../localStorage/getWordsFromLocal';

export const WordsPage: React.FC = () => {

  const wordsArr: Array<WordsType> | null = getWordsFromLocal();

  return (
    <div className="word-wrapper">
      {
        wordsArr !== null
        ?
        <div>
          <h1 className="word">{wordsArr[0].word}</h1>
          <h2 className="word-translate">{wordsArr[0].wordTranslate}</h2>
        </div>
        :
        <p className="words-err">Error: Words not found</p>
      }
    </div>
  )
}