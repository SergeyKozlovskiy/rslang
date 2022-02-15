import React from 'react';
import { API } from '../../types/enums';
import { WordsType } from '../../types/types';
import './wordCard.css';

export const WordCard: React.FC<WordsType> = (props: WordsType) => {
  return (
    <div className="word-card">
      <div className="card-wrapper">
        <img src={`${API.URL}${props.image}`} alt="" className="word-image" />
        <h2 className="word-exemple">{props.word}</h2>
        <p className="word-transcription">{props.transcription}</p>
        <p className="word-meaning" dangerouslySetInnerHTML={{__html: props.textMeaning}}></p>
        <p className="word-meaning_translate">{props.textMeaningTranslate}</p>
        <p className="word-text" dangerouslySetInnerHTML={{__html: props.textExample}}></p>
        <p className="word-text_translate">{props.textExampleTranslate}</p>
      </div>
    </div>
  )
}