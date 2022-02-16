import React, { MouseEvent, useState } from 'react';
import './wordsPage.css';
import { WordsType } from '../../../types/types';
import { getWordsFromLocal } from '../../../localStorage/getWordsFromLocal';
import { useDispatch } from 'react-redux';
import { unLoadWordsAction } from '../../../store/actions';
import { WordCard } from '../../../components/wordCard/WordCard';
import { levelArr } from '../../../constants/arrays';
import { getWords } from '../../../requests/getWords';
import { setWords } from '../../../localStorage/setWords';

export const WordsPage: React.FC = () => {

  const dispatch = useDispatch();

  const wordsArr: Array<WordsType> | null = getWordsFromLocal();

  const [state, setState] = useState(
    {
      allWords: wordsArr !== null ? wordsArr : null,
      word: wordsArr !== null ? wordsArr[0] : null,
      page: wordsArr !== null ? wordsArr[0].page : null,
      group: wordsArr !== null ? wordsArr[0].group : null,
      isActive: false,
      selected: levelArr[wordsArr !== null ? wordsArr[0].group : 0]
    }
  );

  const setWordOnState = (key: string) => {
    wordsArr?.forEach((item: WordsType) => {
      if(Number(item.id === key)) {
        setState(
          {
            allWords: wordsArr,
            word: item,
            page: item.page,
            group: item.group,
            isActive: state.isActive,
            selected: state.selected
          }
        )
      }
    });
  };

  const activeWord = (e: MouseEvent) => {
    const prevActiveBtn = document.querySelector('.active-word') as HTMLButtonElement;
    const target = e.target as HTMLButtonElement;
    let key: string;
    
    prevActiveBtn.classList.remove('active-word');

    if(target.className !== 'word-wrapper' && target.parentElement) {

      if(target.parentElement.dataset.key) {
        key = target.parentElement.dataset.key;
        setWordOnState(key);
      }

      target.parentElement.classList.add('active-word');
    } else {

      if(target.dataset.key) {
        key = target.dataset.key;
        setWordOnState(key);
      }

      target.classList.add('active-word');
    }
  };

  const changeLevel = (e: MouseEvent): void => {
    const target = e.target as HTMLLIElement;
    if(target.dataset.group) {
      getWords(Number(target.dataset.group), 0).then((words: Array<WordsType>) => {
        if(target.textContent) {
          setWords(words);
          setState(
            {
              allWords: words,
              word: words[0],
              page: words[0].page,
              group: words[0].group,
              isActive: false,
              selected: target.textContent
            }
          )
        }
      });
    }
  }

  const changePage = (e: MouseEvent): void => {
    const target = e.target as HTMLButtonElement;
    if(state.group !== null && state.page !== null) {
      if(target.dataset.prev) {
        getWords(state.group, state.page - 1).then((words: Array<WordsType>) => {
          setWords(words);
          setState(
            {
              allWords: words,
              word: words[0],
              page: words[0].page,
              group: words[0].group,
              isActive: state.isActive,
              selected: state.selected
            }
          )
        });
      } else {
        getWords(state.group, state.page + 1).then((words: Array<WordsType>) => {
          setWords(words);
          setState(
            {
              allWords: words,
              word: words[0],
              page: words[0].page,
              group: words[0].group,
              isActive: state.isActive,
              selected: state.selected
            }
          )
        });
      }
    }
  }

  return (
    <div className="words-page">
      <nav className="words-navigation">
        <button onClick={() => dispatch(unLoadWordsAction())} className="words-home">Закрыть учебник</button>
        <div className="buttons-page_wrapper">
          <button onClick={(e) => changePage(e)} className="words-prev-page words-btn_default" data-prev="prev" disabled={state.page === 0 ? true : false}>Назад</button>
          <div className="select">
            <div 
            onClick={() => setState({
              allWords: state.allWords,
              word: state.word,
              page: state.page,
              group: state.group,
              isActive: !state.isActive, 
              selected: state.selected
            })} 
            className="select-btn" 
            dangerouslySetInnerHTML={{__html: state.selected}}></div>
          {
            state.isActive && (
              <ul className="select-options">
                {
                  levelArr.map((item: string) =>
                    <li className="option" data-group={levelArr.indexOf(item)} key={item} onClick={(e) => changeLevel(e)}>
                      {item}
                    </li>
                  )
                }
              </ul>
            )
          }
        </div>
          <button onClick={(e) => changePage(e)} className="words-next-page words-btn_default" data-next="next" disabled={state.page === 29 ? true : false}>Вперёд</button>
        </div>
      </nav>
      {
        state.allWords !== null
        ?
        <div className="words-wrapper">
          <div className="words-btn_wrapper">
            {
              state.allWords.map((item: WordsType) => 
              state.allWords?.indexOf(item) === 0
              ?
                <button onClick={(e) => activeWord(e)} className='word-wrapper active-word' data-key={item.id} key={item.id}>
                  <h2 className="word">{item.word}</h2>
                  <p className="word-translate">{item.wordTranslate}</p>
                </button>
              :
                <button onClick={(e) => activeWord(e)} className='word-wrapper' data-key={item.id} key={item.id}>
                  <h2 className="word">{item.word}</h2>
                  <p className="word-translate">{item.wordTranslate}</p>
                </button>
              )
            }
          </div>
          <WordCard 

            id={state.word !== null ? state.word.id : ''}
            group={state.word !== null ? state.word.group : 0}
            page={state.word !== null ? state.word.page : 0}
            word={state.word !== null ? state.word.word : ''}
            image={state.word !== null ? state.word.image : ''}
            audio={state.word !== null ? state.word.audio : ''}
            audioMeaning={state.word !== null ? state.word.audioMeaning : ''}
            audioExample={state.word !== null ? state.word.audioExample : ''}
            textMeaning={state.word !== null ? state.word.textMeaning : ''}
            textExample={state.word !== null ? state.word.textExample : ''}
            transcription={state.word !== null ? state.word.transcription : ''}
            wordTranslate={state.word !== null ? state.word.wordTranslate : ''}
            textMeaningTranslate={state.word !== null ? state.word.textMeaningTranslate : ''}
            textExampleTranslate={state.word !== null ? state.word.textExampleTranslate : ''}
          />
        </div>
        :
        <p className="words-err">Error: Words not found</p>
      }
    </div>
  )
}