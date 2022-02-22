import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAggregatedWords } from '../../requests/getAggregatedWords';
import { postWord } from '../../requests/postWord';
import store from '../../store/store';
import { API, Text, WordsDifficult } from '../../types/enums';
import { IReduxState, WordsDifficultCardBtn, WordsType } from '../../types/types';
import { AudioPlayBtn } from '../audioPlaybtn/AudioPlayBtn';
import './wordCard.css';

export const WordCard: React.FC<WordsType> = (props: WordsType) => {

  const [wordsInfo, setInfo] = useState<WordsDifficultCardBtn>({
    aggregatedWordsLoaded: false,
    hardWords: null,
    lernWords: null,
    activeWord: null
  });
  const dispatch = useDispatch();
  const reduxState: IReduxState = useSelector((state: IReduxState) => state);

  useEffect(() => {
    if(reduxState.IsLogin === true) {
      const getHardWords = getAggregatedWords(WordsDifficult.hard, dispatch);
      const getLernWords = getAggregatedWords(WordsDifficult.lern, dispatch);
      Promise.all([getHardWords, getLernWords]).then(values => {
        if(values[0] && values[1]) {
          setInfo({
            aggregatedWordsLoaded: true,
            hardWords: values[0][0].paginatedResults.map(item => item._id),
            lernWords: values[1][0].paginatedResults.map(item => item._id),
            activeWord: null
          });
        }
      });
    } else {
      setInfo({
        aggregatedWordsLoaded: true,
        hardWords: null,
        lernWords: null,
        activeWord: null
      });
    }
  },[wordsInfo.activeWord, reduxState.IsLogin ]);

  const changeActiveWord = () => {
    setInfo({
      aggregatedWordsLoaded: wordsInfo.aggregatedWordsLoaded,
      hardWords: wordsInfo.hardWords,
      lernWords: wordsInfo.lernWords,
      activeWord: props.id
    })
  }

  return (
    <div className="word-card">
      <div className={`card-wrapper ${wordsInfo.hardWords?.includes(props.id) ? 'hard-word' : wordsInfo.lernWords?.includes(props.id) ? 'lern-word' : ''}`}>
        <img src={`${API.URL}${props.image}`} alt={props.word} className="word-image" />
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
              wordsInfo.hardWords?.includes(props.id)
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
              <div className="settings-wrapper">
              <button onClick={(e) => {if(props.deleteFunc) {props.deleteFunc(e)}}} className="word-hard settings-btn_defaul" data-key={props.id}>{Text.wordCardDeleteBtn}</button>
            </div>
            :

            store.getState().IsLogin === true
            ?
            <div className="settings-wrapper">
              {
                wordsInfo.lernWords?.includes(props.id)
                ?
                ''
                :
                  wordsInfo.hardWords?.includes(props.id)
                  ?
                  <button 
                  onClick={() => {
                    postWord(props, WordsDifficult.lern, dispatch);
                    changeActiveWord()
                  }} 
                  className="word-lern settings-btn_defaul" 
                  data-key={props.id}>
                    {Text.wordCardLernBtn}
                  </button>
                  :
                  <div className='aggregated-buttons'>
                    <button 
                    onClick={() => {
                      postWord(props, WordsDifficult.lern, dispatch);
                      changeActiveWord()
                    }} 
                    className="word-lern settings-btn_defaul" 
                    data-key={props.id}>
                      {Text.wordCardLernBtn}
                    </button>

                    <button 
                    onClick={() => {
                      postWord(props, WordsDifficult.hard, dispatch);
                      changeActiveWord()
                    }} 
                    className="word-hard settings-btn_defaul" 
                    data-key={props.id}>
                      {Text.wordCardHardBtn}
                    </button>
                  </div>              
              }
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