import { Button, CloseButton, Dropdown, DropdownButton } from 'react-bootstrap';
import fullScreen from '../../../asset/svg/fullscreen.svg';
import { timer } from '../../../functions/timer';
import _ from 'lodash';
import { getWords } from '../../../requests/getWords';
import './sprint.css';
import { MagicNumbers, Text } from '../../../types/enums';
import { useState } from 'react';

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
  
  async function getData () {
    try {
      const randomGroup = _.random(0, 5);
      const randomPage = _.random(0, 29);
      const result = await getWords(randomGroup, randomPage).then((value) => value);
      dataWords = result;
      console.log(result);
      createArrAnswers();
    }
    catch(error){
      console.log(error);
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
    console.log(answers);
  }

  const responseСheck = (answer: boolean) => {
    const questionCard = document.querySelector('.question-card') as HTMLElement;
    if(questionData.answer === answer && questionCard){
      answers.rightAnswer.push(questionData);
      console.log('правильно');
      questionCard.classList.add('right-answer');
      setTimeout(() => {
        questionCard.classList.remove('right-answer');
      }, 400)
    }else{
      answers.wrongAnswer.push(questionData);
      console.log('не правильно')
      questionCard.classList.add('wrong-answer');
      setTimeout(() => {
        questionCard.classList.remove('wrong-answer');
      }, 400)
    }
    console.log(numQuestion);
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

    <div id="timer" className='hide-popup'></div>

    <div className="question-card hide-popup">
      <p className="question-card_word">{questionData.word}</p>
      <p className="question-card_translate">{questionData.translate}</p>
      <Button className='question-card_btn' onClick={() => {responseСheck(false)}} variant="danger">{Text.WrongAnswerSprintButton}</Button>
      <Button className='question-card_btn' onClick={() => {responseСheck(true)}} variant="success">{Text.RightAnswerSprintButton}</Button>
    </div>

    <div className="results hide-popup">
      <h3>Результаты</h3>
      <p>Вы набрали n очков</p>
      <div className="results-answers">
      <strong>Правильные ответы</strong>
      <div>{answers.rightAnswer.map(answerData => {
        return <div>
          <span>{answerData.word} </span>
          <span>- {answerData.translate}</span>
        </div>
      })}</div>
      <strong>Не правильные ответы</strong>
      <div>{answers.wrongAnswer.map(answerData => {
        return <div>
          <span>{answerData.word} </span>
          <span>- {answerData.translate}</span>
        </div>
      })}</div>
      </div>
      <Button onClick={closePopUp} variant="secondary">Выйти</Button>
    </div>
  </div>
};