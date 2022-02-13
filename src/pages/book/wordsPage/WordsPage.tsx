import React, { MouseEvent } from 'react';
import './wordsPage.css';
import { WordsType } from '../../../types/types';
import { getWordsFromLocal } from '../../../localStorage/getWordsFromLocal';
import { useDispatch } from 'react-redux';
import { unLoadWordsAction } from '../../../store/actions';

export const WordsPage: React.FC = () => {

  const dispatch = useDispatch();

  const wordsArr: Array<WordsType> | null = getWordsFromLocal();

  const activeWord = (e: MouseEvent) => {
    const prevActiveBtn = document.querySelector('.active-word') as HTMLButtonElement;
    const target = e.target as HTMLButtonElement;
    prevActiveBtn.classList.remove('active-word');
    if(target.className !== 'word-wrapper' && target.parentElement) {
      target.parentElement.classList.add('active-word');
    } else {
      target.classList.add('active-word');
    }
  }

  return (
    <div className="words-page">
      <nav className="words-navigation">
        <button onClick={() => dispatch(unLoadWordsAction())} className="words-home">на главную</button>
      </nav>
      {
        wordsArr !== null
        ?
        <div className="words-wrapper">
          {
              wordsArr.map((item: WordsType) => 
              wordsArr.indexOf(item) === 0
              ?
              <button onClick={(e) => activeWord(e)} className='word-wrapper active-word' key={item.id}>
                <h2 className="word">{item.word}</h2>
                <p className="word-translate">{item.wordTranslate}</p>
              </button>
              :
              <button onClick={(e) => activeWord(e)} className='word-wrapper' key={item.id}>
                <h2 className="word">{item.word}</h2>
                <p className="word-translate">{item.wordTranslate}</p>
              </button>
            )
          }
        </div>
        :
        <p className="words-err">Error: Words not found</p>
      }
    </div>
  )
}