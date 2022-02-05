import { Button, CloseButton, Dropdown, DropdownButton } from 'react-bootstrap';
import fullScreen from '../../../asset/svg/fullscreen.svg';
import { timer } from '../../../functions/timer';
import _ from 'lodash';
import { getWords } from '../../../requests/getWords';
import './sprint.css';

type Word = {
    id: "string",
    group: number,
    page: number,
    word: "string",
    image: "string",
    audio: "string",
    audioMeaning: "string",
    audioExample: "string",
    textMeaning: "string",
    textExample: "string",
    transcription: "string",
    wordTranslate: "string",
    textMeaningTranslate: "string",
    textExampleTranslate: "string"
}

type Answer = {
  word: "string",
  translate: "string",
}


export const Sprint: React.FC = () => {
  let dataWords : Word[];
  let rightAnswers : Answer[] = [];
  let numQuestion = 0;

  const createQuestion = () => {
    const randomNum = _.random(0, 1);
    const question = {
      word : rightAnswers[numQuestion],
      translate : rightAnswers[numQuestion + randomNum],
      answer : [randomNum === 0 ? true : false]
    }
    return question;
  }

  const createArrAnswers = () => {
    console.log(dataWords);

    dataWords.forEach((elem, i) => {
      const answer = {
        word: elem.word,
        translate: elem.wordTranslate
      }
      rightAnswers.push(answer)
    })

    console.log(rightAnswers);
  }

  const start = () => {
    const popUp = document.querySelector('.sprint-popup') as HTMLElement;
    popUp?.classList.add('hide-popup');
    timer();
    async function getData () {
      try {
        const randomGroup = _.random(0, 5);
        const randomPage = _.random(0, 29);
        const result = await getWords(randomGroup, randomPage).then((value) => value);
        dataWords = result;
        createArrAnswers();
      }
      catch(error){
        console.log(error);
      }
    }
    getData();


  }

  return <div className="sprint-wrapper">
    <div className="sprint-settings">
      <button><img src={fullScreen} alt="fullScreen"/></button>
      <DropdownButton className='dropdown-level' title="Уровень ">
        <Dropdown.Item href="#/action-1">Уровень 1</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Уровень 2</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Уровень 3</Dropdown.Item>
        <Dropdown.Item href="#/action-1">Уровень 4</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Уровень 5</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Уровень 5</Dropdown.Item>
      </DropdownButton>
      <CloseButton />
    </div>
    <div className="sprint-popup">
      <h3>Спринт</h3>
      <p>Выберите соответсвует ли перевод предложенному слову</p>
      <Button onClick={start} className='sprint-popup_btn' variant="secondary">Начать</Button>
    </div>
    <div id="timer"></div>
  </div>
};