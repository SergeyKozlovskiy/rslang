import React from 'react';
import { API } from '../../types/enums';
import { WordsType } from '../../types/types';
import { AudioPlayBtn } from '../audioPlaybtn/AudioPlayBtn';
import './wordCard.css';

export const WordCard: React.FC<WordsType> = (props: WordsType) => {
  return (
    <div className="word-card">
      <div className="card-wrapper">
        <img src={`${API.URL}${props.image}`} alt="" className="word-image" />
        <h2 className="word-exemple">{props.word}</h2>
        <p className="word-transcription">{props.transcription}</p>
        <div className="word-mean">
          <p className="word-meaning" dangerouslySetInnerHTML={{__html: props.textMeaning}}></p>
          <p className="word-meaning_translate">{props.textMeaningTranslate}</p>
        </div>
        <div className="word-sentence">
          <p className="word-text" dangerouslySetInnerHTML={{__html: props.textExample}}></p>
          <p className="word-text_translate">{props.textExampleTranslate}</p>
        </div>
        <div className="word-settings">
          <div className="settings-wrapper">
            <button className="word-hard settings-btn_defaul">В сложные слова</button>
            <button className="word-lern settings-btn_defaul">В изученые слова</button>
          </div>
          <AudioPlayBtn 
          audioUrl={props.audio}
          audioExempleUrl={props.audioExample}
          audioMeaningUrl={props.audioMeaning}
          />
        </div>
      </div>
    </div>
  )
}