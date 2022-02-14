import { Button, CloseButton, Form} from 'react-bootstrap';
import fullScreen from '../../../assets/svg/fullscreen.svg';
import fullScreenExit from '../../../assets/svg/fullscreen-exit.svg';
import audioImg from '../../../assets/svg/audio.svg';
import muteImg from '../../../assets/svg/mute.svg';
import { timer } from '../../../functions/timer';
import _ from 'lodash';
import { getWords } from '../../../requests/getWords';
import { API, MagicNumbers, Text } from '../../../types/enums';
import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import './sprint.css';
import { Link } from 'react-router-dom';
import { Question, WordData, Answers} from '../../../types/types';
const correctAnswer = require("../../../assets/audio/correctAnswer.mp3");
const incorrectAnswer = require("../../../assets/audio/incorrectAnswer.mp3");
const end = require("../../../assets/audio/end.mp3");

export const Sprint: React.FC = () => {
  const [questionData, setQuestionData] = useState<Question>({
    word: '',
    translate: '', 
    answer:  true, 
    audio: ''
  });
  const [resultsAllAnswers, setResultsAllAnswers] = useState<Answers>({
    rightAnswer: [],
    wrongAnswer: []
  });
  const [wordData, setWordData] = useState<WordData[]>([]);
  const [numQuestion, setNumQuestion] = useState(0);
  const [indicatorNumber, setIndicatorNumber] = useState(0);
  const [level, setLevel] = useState(0);
  const [mute, setMute] = useState(true);
  const [score, setScore] = useState(0);
  const [seriesOfCorrectAnswers,setSeriesOfCorrectAnswers] = useState(0);
  const [longestSeriesCorrectAnswers, setLongestSeriesCorrectAnswers] = useState(0);
  
  const changeStatistics = () => {
    const statistics = {
      learnedWords: 0, 
      optional: {
        correctAnswers: 0, 
        seriesCorrectAnswers: 0
    }}

    setResultsAllAnswers(prevAnswer => {
      const sumAllAnswers = prevAnswer.rightAnswer.length + prevAnswer.wrongAnswer.length;
      const sumAllCurrectAnswers = prevAnswer.rightAnswer.length;
      statistics.learnedWords = prevAnswer.rightAnswer.length;
      statistics.optional.correctAnswers = (sumAllCurrectAnswers / sumAllAnswers) * 100;
      return {
        ...prevAnswer
      }
    })

    setLongestSeriesCorrectAnswers(prevValue => {
      statistics.optional.seriesCorrectAnswers = prevValue;
      return prevValue;
    })
  }

  const changeLevel = (level: string) => {
    setLevel(Number(level));
    getData(Number(level));
  }

  const resetGame = () => {
    setNumQuestion(0);
    setIndicatorNumber(0);
    setScore(0);
    setSeriesOfCorrectAnswers(0);
    setResultsAllAnswers({
      rightAnswer: [],
      wrongAnswer: []
    });
  }

  const changeFullScreen = (event: SyntheticEvent) => {
    const target = event.target as HTMLImageElement;
   if (document.fullscreenElement) {
    document.exitFullscreen();
    target.setAttribute('src', fullScreen);
   } else {
    document.documentElement.requestFullscreen();
    target.setAttribute('src', fullScreenExit);
   }
  }

  const changeIndicatorNumber = () => {
    if(indicatorNumber !== 2) {
      setIndicatorNumber(prevIndicatorNumber => prevIndicatorNumber + 1);
    }else{
      setIndicatorNumber(0);
    }
  }

  const changeMute = (event: SyntheticEvent) => {
    const target = event.target as HTMLImageElement;
    if(mute){
      setMute(false);
      target.setAttribute('src', muteImg);
    }else{
      setMute(true);
      target.setAttribute('src', audioImg);
    }
    
  }

  const startAudio = (path: string) => {
    setMute(prevMute => {
      if(prevMute){
        const audioObj = new Audio(`${path}`);
        audioObj.play();
      }
      return prevMute;
    })
    
  }

  const voice = (path: string) => {
    const audioObj = new Audio(`${path}`);
    audioObj.play();
  }

  const clearIndicators = () => {
    const indicators = document.querySelectorAll('.question-card_indicators__item');
    indicators.forEach(item => {
      item.classList.remove('correct-answer_indicator__1');
      item.classList.remove('correct-answer_indicator__2');
      item.classList.remove('correct-answer_indicator__3');
    })
  }

  const changeScore = (answer: boolean) => {
    const indicators = document.querySelectorAll('.question-card_indicators__item');
    if(answer){
      if(seriesOfCorrectAnswers < MagicNumbers.SERIES_OF_CORRECT_ANSWERS_1){
        setScore(prevScore => prevScore +  MagicNumbers.BASIC_SCORE);
        indicators[indicatorNumber].classList.add('correct-answer_indicator__1');
      }else if(seriesOfCorrectAnswers >= MagicNumbers.SERIES_OF_CORRECT_ANSWERS_1 && seriesOfCorrectAnswers < MagicNumbers.SERIES_OF_CORRECT_ANSWERS_2){
        setScore(prevScore => prevScore + MagicNumbers.BONUS_SCORE);
        indicators[indicatorNumber].classList.add('correct-answer_indicator__2');
      }else if(seriesOfCorrectAnswers >= MagicNumbers.SERIES_OF_CORRECT_ANSWERS_2){
        setScore(prevScore => prevScore + MagicNumbers.SUPER_BONUS_SCORE);
        indicators[indicatorNumber].classList.add('correct-answer_indicator__3');
      }
      changeIndicatorNumber();
      setSeriesOfCorrectAnswers(prev => prev + 1);
    }else{
      if(longestSeriesCorrectAnswers < seriesOfCorrectAnswers){
        setLongestSeriesCorrectAnswers(seriesOfCorrectAnswers);
      }
      setSeriesOfCorrectAnswers(0);
      setIndicatorNumber(0);
      clearIndicators();
    }
  }

  const closePopUp = () => {
    const resultPopUp = document.querySelector('.results') as HTMLElement; 
    const sprintPopUp = document.querySelector('.sprint-popup') as HTMLElement;
    const questionСard = document.querySelector('.question-card') as HTMLElement;
    const timerElem = document.getElementById('timer') as HTMLElement;
    resultPopUp?.classList.add('hide-popup');
    questionСard?.classList.add('hide-popup');
    timerElem?.classList.add('hide-popup');
    sprintPopUp?.classList.remove('hide-popup');
    resetGame();
  }

  const showResult = () => {
    const resultPopUp = document.querySelector('.results') as HTMLElement;
    const selectLevel = document.querySelector('.sprint-settings_level') as HTMLElement;
    resultPopUp.classList.remove('hide-popup');
    selectLevel.removeAttribute('disabled');
    changeStatistics();
    startAudio(end);
  }

  const responseСheck = (answer: boolean) => {
    const questionCard = document.querySelector('.question-card') as HTMLElement;
    if(questionData.answer === answer && questionCard){
      setResultsAllAnswers(prevAnswer => {
        return {
          ...prevAnswer,
          rightAnswer: [...prevAnswer.rightAnswer, questionData]
        }
      });

      changeScore(true);
      startAudio(correctAnswer);
      questionCard.classList.add('right-answer');
      setTimeout(() => {
        questionCard.classList.remove('right-answer');
      }, 400)
    }else{
      setResultsAllAnswers(prevAnswer => {
        return {
          ...prevAnswer,
          wrongAnswer: [...prevAnswer.wrongAnswer, questionData]
        }
      });
      changeScore(false);
      startAudio(incorrectAnswer);
      questionCard.classList.add('wrong-answer');
      setTimeout(() => {
        questionCard.classList.remove('wrong-answer');
      }, 400);
    }
    if(numQuestion === 19){
      setNumQuestion(0);
      getData();
    }
    setTimeout(() => {
      createQuestion();
    }, 100);
  }

  const createQuestion = () => {
    if(numQuestion === 20) {
      
    }else if(wordData && numQuestion < MagicNumbers.MAX_NUM_OF_QUESTIONS){
      const randomNum = _.random(0, 1);
      const question = {
        word : wordData[numQuestion].word,
        translate : wordData[numQuestion + randomNum].wordTranslate,
        audio: wordData[numQuestion].audio,
        answer : randomNum === 0 ? true : false
      }
      setNumQuestion(prevNumQuestion => prevNumQuestion + 1);
      setQuestionData(question);
    }
  }

  const getData = useCallback(async (num?: number) => {
      try {
        const randomPage = _.random(0, 29);
        const result = await getWords(num ? num : level, randomPage).then((value) => value);
        if(result){
          setWordData(result);
        }
      }
      catch(error){
        console.log(error);
    }
  }, [level]) 

  const start = () => {
    getData();
    const popUp = document.querySelector('.sprint-popup') as HTMLElement;
    const questionСard = document.querySelector('.question-card') as HTMLElement;
    const timerElem = document.getElementById('timer') as HTMLElement;
    const selectLevel = document.querySelector('.sprint-settings_level') as HTMLElement;
    popUp?.classList.add('hide-popup');
    questionСard?.classList.remove('hide-popup');
    timerElem?.classList.remove('hide-popup');
    selectLevel.setAttribute('disabled', 'true');
    clearIndicators(); 
    timer(showResult);
    createQuestion()
  }

  useEffect(() => {
    getData();
  },[getData]); 

  return <div className="sprint-wrapper">
    <div className="sprint-settings">
      <button className='sprint-settings__btn'><img onClick={(e) => {changeFullScreen(e)}} src={fullScreen} alt={fullScreen}/></button>
        <Form.Select className="sprint-settings_level" onChange={(e) => {changeLevel(e.target.value)}}>
          <option value="0">Начальный</option>
          <option value="1">Элементарный</option>
          <option value="2">Слабый средний</option>
          <option value="3">Средний</option>
          <option value="4">Выше среднего</option>
          <option value="5">Продвинутый</option>
        </Form.Select>
      <Link to="/"><CloseButton /></Link>
      
    </div>

    <div className="sprint-popup">
      <h3>{Text.HeaderSprintPopUp}</h3>
      <p>{Text.SubtitleSprintPopUp}</p>
      <Button onClick={start} className='sprint-popup_btn' variant="success">{Text.StartSprintButton}</Button>
    </div>

    <div className="wrapper-question-card">
    <div id="timer" className='hide-popup'></div>

    <div className="question-card hide-popup">
      <div className="question-card__settings">
        <div className='question-card_indicators'>
          <div className='question-card_indicators__item'></div>
          <div className='question-card_indicators__item'></div>
          <div className='question-card_indicators__item'></div>
        </div>
        <img onClick={(e) => {changeMute(e)}} className='results-answers_icon' src={audioImg} alt="audio-icon" />
      </div>

      <p className="question-card_word">Score: {score}</p>
      <p className="question-card_word">{questionData.word}</p>
      <p className="question-card_translate">{questionData.translate}</p>
      <Button className='question-card_btn' onClick={() => {responseСheck(false)}} variant="danger">{Text.WrongAnswerSprintButton}</Button>
      <Button className='question-card_btn' onClick={() => {responseСheck(true)}} variant="success">{Text.RightAnswerSprintButton}</Button>
    </div>
    </div>

    <div className="results hide-popup">
      <h3>Результаты</h3>
      <p>Вы набрали {score} очков</p>
      <div className="results-answers">
      <strong className='results-answers_subtitle'>Правильные ответы</strong>
      <div>{resultsAllAnswers.rightAnswer.map((answerData) => {
        return <div className='results-answers_item' key={answerData.word}>
          <img onClick={() => {voice(`${API.URL}${answerData.audio}`)}} className='results-answers_icon' src={audioImg} alt="audio-icon" />
          <strong className='results-answers_word'>{answerData.word} </strong>
          <span>&nbsp;- {answerData.translate}</span>
        </div>
      })}</div>
      <strong className='results-answers_subtitle'>Не правильные ответы</strong>
      <div>{resultsAllAnswers.wrongAnswer.map((answerData) => {
        return <div className='results-answers_item' key={answerData.word}>
          <img onClick={() => {voice(`${API.URL}${answerData.audio}`)}} className='results-answers_icon' src={audioImg} alt="audio-icon" />
          <strong className='results-answers_word'>{answerData.word} </strong>
          <span>&nbsp;- {answerData.translate}</span>
        </div>
      })}</div>
      </div>
      <Button onClick={closePopUp} variant="secondary">{Text.exit}</Button>
    </div>
  </div>
};