import { Button, CloseButton, Dropdown, DropdownButton } from 'react-bootstrap';
import fullScreen from '../../../asset/svg/fullscreen.svg';
import { timer } from '../../../functions/timer';
import _ from 'lodash';
import { getWords } from '../../../requests/getWords';
import './sprint.css';
import { API, MagicNumbers, Text } from '../../../types/enums';
import { useState } from 'react';
import audio from '../../../asset/svg/audio.svg';

type Word = {
    id: string,
    group: number,
    page: number,
    word: string,
    image: string,
    audio: string,
    audioMeaning: string,
    audioExample: string,
    textMeaning: string,
    textExample: string,
    transcription: string,
    wordTranslate: string,
    textMeaningTranslate: string,
    textExampleTranslate: string
}

type Answer = {
  word: string,
  audio: string,
  translate: string,
}

type Question = {
  word: string,
  translate: string, 
  answer: boolean,
  audio: string
}

interface Answers {
  rightAnswer: Answer[],
  wrongAnswer: Answer[]
}

let dataWords : Word[];
let rightAnswers : Answer[] = [];
let numQuestion = 0;
let seriesOfCorrectAnswers = 0;
let score = 0;
let indicatorNumber = 0;

const answers: Answers = {
  rightAnswer: [],
  wrongAnswer: []
}

export const Sprint: React.FC = () => {
  const [questionData, setQuestion] = useState<Question>({
    word: '',
    translate: '', 
    answer:  true, 
    audio: ''
  });

  const changeIndicatorNumber = () => {

    if(indicatorNumber !== 2) {
      indicatorNumber += 1;
    }else{
      indicatorNumber = 0;
    }
  }

  const startAudio = (name: string) => {
    const audioObj = new Audio(`${API.URL}${name}`);
    audioObj.play();
  }

  async function getData () {
    try {
      // const randomGroup = _.random(0, 5);
      // const randomPage = _.random(0, 29);
      const result = await getWords(1, 1).then((value) => value);
      dataWords = result;
      createArrAnswers();
    }
    catch(error){
      console.log(error);
    }
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
      if(seriesOfCorrectAnswers < 3){
        score += 10;
        indicators[indicatorNumber].classList.add('correct-answer_indicator__1');
      }else if(seriesOfCorrectAnswers >= 3 && seriesOfCorrectAnswers < 6){
        score += 20;
        indicators[indicatorNumber].classList.add('correct-answer_indicator__2');
      }else if(seriesOfCorrectAnswers >= 6){
        score += 40;
        console.log(indicatorNumber);
        indicators[indicatorNumber].classList.add('correct-answer_indicator__3');
      }
      changeIndicatorNumber();
      seriesOfCorrectAnswers += 1;
    }else{
      seriesOfCorrectAnswers = 0;
      indicatorNumber = 0;
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
  }

  const showResult = () => {
    const resultPopUp = document.querySelector('.results') as HTMLElement;
    resultPopUp.classList.remove('hide-popup')
  }

  const responseСheck = (answer: boolean) => {
    const questionCard = document.querySelector('.question-card') as HTMLElement;
    if(questionData.answer === answer && questionCard){
      answers.rightAnswer.push(questionData);
      changeScore(true);
      questionCard.classList.add('right-answer');
      setTimeout(() => {
        questionCard.classList.remove('right-answer');
      }, 400)
    }else{
      answers.wrongAnswer.push(questionData);
      changeScore(false);
      questionCard.classList.add('wrong-answer');
      setTimeout(() => {
        questionCard.classList.remove('wrong-answer');
      }, 400)
    }
    createQuestion();
  }

  const createQuestion = () => {
    if(numQuestion < MagicNumbers.MAX_NUM_OF_QUESTIONS) {
      const randomNum = _.random(0, 1);

      const question = {
        word : rightAnswers[numQuestion].word,
        translate : rightAnswers[numQuestion + randomNum].translate,
        audio: rightAnswers[numQuestion].audio,
        answer : randomNum === 0 ? true : false
      }
      numQuestion++;
      setQuestion(question);
    }else if(numQuestion === MagicNumbers.MAX_NUM_OF_QUESTIONS){
      dataWords = [];
      rightAnswers = [];
      numQuestion = 0;
      getData();
    }
  }

  const createArrAnswers = () => {
    dataWords.forEach((elem) => {
      const answer = {
        word: elem.word,
        translate: elem.wordTranslate, 
        audio: elem.audio
      }
      rightAnswers.push(answer)
    })
    console.log(rightAnswers);
    createQuestion();
  }

  const start = () => {
    const popUp = document.querySelector('.sprint-popup') as HTMLElement;
    const questionСard = document.querySelector('.question-card') as HTMLElement;
    const timerElem = document.getElementById('timer') as HTMLElement;
    clearIndicators(); 
    popUp?.classList.add('hide-popup');
    questionСard?.classList.remove('hide-popup');
    timerElem?.classList.remove('hide-popup');
    timer(showResult);
    getData();
  }

  return <div className="sprint-wrapper">
    <div className="sprint-settings">
      <button><img src={fullScreen} alt={fullScreen}/></button>
      <DropdownButton className='dropdown-level' title="Уровень ">
        <Dropdown.Item href="">{Text.DropdownText} 1</Dropdown.Item>
        <Dropdown.Item href="">{Text.DropdownText} 2</Dropdown.Item>
        <Dropdown.Item href="">{Text.DropdownText} 3</Dropdown.Item>
        <Dropdown.Item href="">{Text.DropdownText} 4</Dropdown.Item>
        <Dropdown.Item href="">{Text.DropdownText} 5</Dropdown.Item>
        <Dropdown.Item href="">{Text.DropdownText} 6</Dropdown.Item>
      </DropdownButton>
      <CloseButton />
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
        <img className='results-answers_icon' src={audio} alt="audio-icon" />
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
      <div>{answers.rightAnswer.map((answerData) => {
        return <div className='results-answers_item' key={answerData.word}>
          <img onClick={() => {startAudio(answerData.audio)}} className='results-answers_icon' src={audio} alt="audio-icon" />
          <strong className='results-answers_word'>{answerData.word} </strong>
          <span>&nbsp;- {answerData.translate}</span>
        </div>
      })}</div>
      <strong className='results-answers_subtitle'>Не правильные ответы</strong>
      <div>{answers.wrongAnswer.map((answerData) => {
        return <div className='results-answers_item' key={answerData.word}>
          <img onClick={() => {startAudio(answerData.audio)}} className='results-answers_icon' src={audio} alt="audio-icon" />
          <strong className='results-answers_word'>{answerData.word} </strong>
          <span>&nbsp;- {answerData.translate}</span>
        </div>
      })}</div>
      </div>
      <Button onClick={closePopUp} variant="secondary">Выйти</Button>
    </div>
  </div>
};