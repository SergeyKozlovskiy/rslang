import React from 'react';
import { useDispatch } from 'react-redux';
import { postWord } from '../../requests/postWord';
import store from '../../store/store';
import { API, Text, WordsDifficult } from '../../types/enums';
import { WordsType } from '../../types/types';
import { AudioPlayBtn } from '../audioPlaybtn/AudioPlayBtn';
import './wordCard.css';

export const WordCard: React.FC<WordsType> = (props: WordsType) => {

  const dispatch = useDispatch();

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
          {
            props.isAggregated
            ?
            <div className="settings-wrapper">
              <button onClick={(e) => {if(props.deleteFunc) {props.deleteFunc(e)}}} className="word-hard settings-btn_defaul" data-key={props.id}>{Text.wordCardDeleteBtn}</button>
              <button onClick={() => {
                postWord(props, WordsDifficult.lern, dispatch);
                if(props.getWordsFunc) {
                  props.getWordsFunc(WordsDifficult.hard);
                }
              }} 
              className="word-lern settings-btn_defaul" data-key={props.id}>{Text.wordCardLernBtn}</button>
            </div>
            :

            store.getState().IsLogin === true
            ?
            <div className="settings-wrapper">
              <button 
              onClick={() => {
                postWord(props, WordsDifficult.hard, dispatch);
              }} 
              className="word-hard settings-btn_defaul" 
              data-key={props.id}>
                {Text.wordCardHardBtn}
              </button>

              <button 
              onClick={() => {
                postWord(props, WordsDifficult.lern, dispatch);
              }} 
              className="word-lern settings-btn_defaul" 
              data-key={props.id}>
                {Text.wordCardLernBtn}
              </button>
            </div>
            :
            ''
          }
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