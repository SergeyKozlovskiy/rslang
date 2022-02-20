import React, { MouseEvent, useState } from 'react';
import './dictionary.css';
import { useDispatch, useSelector } from 'react-redux';
import { DictionaryStateType, IReduxState } from '../../types/types';
import { DictionaryBtn } from '../../components/dictionaryBtn/DictionaryBtn';
import { getAggregatedWords } from '../../requests/getAggregatedWords';
import { WordCard } from '../../components/wordCard/WordCard';
import { deleteUserWord } from '../../requests/deleteUserWord';
import { Text, WordsDifficult } from '../../types/enums';

export const Dictionary: React.FC = () => {

  const [localState, setLocalState] = useState<{isLoaded: boolean, wordsArr: Array<DictionaryStateType> | null, difficulty: string}>({
    isLoaded: false,
    wordsArr: null,
    difficulty: ''
  });
  const dispatch = useDispatch();
  const reduxState: IReduxState = useSelector((state: IReduxState) => state);

  const getWords = (difficulty: string): void => {
    getAggregatedWords(difficulty, dispatch)
    .then(words => {
      setLocalState(
        {
          isLoaded: true,
          wordsArr: words,
          difficulty: difficulty
        }
      );
    });
  }

  const deleteWord = (e: MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    if(target.dataset.key) {
      deleteUserWord(target.dataset.key, dispatch);
      getWords(localState.difficulty);
    }
  }


  return (
    reduxState.IsLogin === true
    ?
      !localState.isLoaded
      ?
      <div className="dictionary-menu">
        <DictionaryBtn text={Text.dictionaryBtnTextHard} style='1' func={getWords} difficulty={WordsDifficult.hard}/>
        <DictionaryBtn text={Text.dictionaryBtnTextLern} style='2' func={getWords} difficulty={WordsDifficult.lern}/>
      </div> 
      :
      <div className="dictionary-page">
        <button 
        onClick={() => setLocalState({
          isLoaded: false,
          wordsArr: localState.wordsArr,
          difficulty: localState.difficulty
        })} 
        className="dictionary-home">
          home
        </button>
        <div className="dictionary-wrapper">
          {
            localState.wordsArr !== null
            ?
            localState.wordsArr[0].paginatedResults.map((el) => {
              return (
                <WordCard 
                id={el._id}
                group={el.group}
                page={el.page}
                word={el.word}
                image={el.image}
                audio={el.audio}
                audioMeaning={el.audioMeaning}
                audioExample={el.audioExample}
                textMeaning={el.textMeaning}
                textExample={el.textExample}
                transcription={el.transcription}
                wordTranslate={el.wordTranslate}
                textMeaningTranslate={el.textMeaningTranslate}
                textExampleTranslate={el.textExampleTranslate}
                key={el._id}
                isAggregated={true}
                deleteFunc={deleteWord}
                getWordsFunc={getWords}
              />
              )
            })
            :
            ''
          }
        </div>
      </div>
    :
    <h2>{Text.dictionaryWarning}</h2>
  )
}