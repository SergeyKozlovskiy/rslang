import { Button } from 'react-bootstrap';
import { SettingGame } from '../../../components/settingsGame/settingsGame';
import { StartGame } from '../../../components/startGamePopup/startGame';
import dynamic from '../../../assets/game-page/speak.png';
import './audioChallenge.css';
import { random, shuffle } from 'lodash';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWords } from '../../../requests/getWords';
import { Answers, IReduxState, Word, WordData } from '../../../types/types';
import { ResultGamePopup } from '../../../components/resultGamePopup/resultGamePopup';
import { API, MagicNumbers, RequestStatistic, Text } from '../../../types/enums';
import { putStatistic } from '../../../requests/putStatistic';
const correctAnswerAudio = '../../../assets/audio/correctAnswer.mp3';
const incorrectAnswerAudio = '../../../assets/audio/incorrectAnswer.mp3';
const gameOverAudio = '../../../assets/audio/end.mp3';

export const AudioChallenge: React.FC = () => {
  const [resultsAllAnswers, setResultsAllAnswers] = useState<Answers>({
    rightAnswer: [],
    wrongAnswer: [],
  });
  const [currectAnswer, setCurrectAnswer] = useState<Word>({
    word: '',
    audio: '',
    translate: '',
  });
  const [wordData, setWordData] = useState<WordData[]>([]);
  const [numQuestion, setNumQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<Word[]>([]);
  const [seriesOfCorrectAnswers, setSeriesOfCorrectAnswers] = useState(0);
  const [longestSeriesCorrectAnswers, setLongestSeriesCorrectAnswers] = useState(0);
  const state: IReduxState = useSelector((state: IReduxState) => state);
  const dispatch = useDispatch();

  const getDate = () => {
    const date = new Date();
    let day = String(date.getDate());
    if (day.length < 2) day = '0' + day;
    let month = String(date.getMonth() + 1);
    if (month.length < 2) month = '0' + month;
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const resetGame = () => {
    setNumQuestion(0);
    setScore(0);
    setSeriesOfCorrectAnswers(0);
    setResultsAllAnswers({
      rightAnswer: [],
      wrongAnswer: [],
    });
  };

  const getStatistics = () => {
    const statistics = {
      lastActivity: '',
      corectAnswers: 0,
      persent: 0,
      wins: 0,
    };

    statistics.lastActivity = getDate();

    setResultsAllAnswers((prevAnswer) => {
      const sumAllAnswers = prevAnswer.rightAnswer.length + prevAnswer.wrongAnswer.length;
      const sumAllCurrectAnswers = prevAnswer.rightAnswer.length;
      statistics.corectAnswers = sumAllCurrectAnswers;
      statistics.persent = Math.round(
        (sumAllCurrectAnswers / sumAllAnswers) * MagicNumbers.PERCENT
      );
      return {
        ...prevAnswer,
      };
    });

    setLongestSeriesCorrectAnswers((prevValue) => {
      statistics.wins = prevValue;
      return prevValue;
    });

    if (state.IsLogin === true) {
      putStatistic(statistics, RequestStatistic.audioChalenge, dispatch);
    }
  };

  const getCurrectAnswer = () => {
    soundWord();
    setNumQuestion((prevnum) => {
      const currectAnswer = {
        audio: wordData[prevnum].audio,
        word: wordData[prevnum].word,
        translate: wordData[prevnum].wordTranslate,
        img: wordData[prevnum].image,
      };
      setCurrectAnswer(currectAnswer);
      createAllAnswers(currectAnswer);

      return prevnum;
    });
  };

  const createAllAnswers = (currectAnswer: Word) => {
    const randomAnswers: Word[] = [];
    randomAnswers.push(currectAnswer);

    while (randomAnswers.length < MagicNumbers.NUMBER_OF_RESPONSES) {
      const randIntExcep = (min: number, max: number, exp: number) => {
        let n;
        while (true) {
          if ((n = Math.floor(Math.random() * (max - min + 1)) + min) !== exp) return n;
        }
      };

      const randomNum = randIntExcep(
        MagicNumbers.MIN_QUESTION_NUMBER,
        MagicNumbers.MAX_QUESTION_NUMBER,
        numQuestion
      );

      const randomAnswer = {
        audio: wordData[randomNum].audio,
        word: wordData[randomNum].word,
        translate: wordData[randomNum].wordTranslate,
        img: wordData[randomNum].image,
      };
      const isEqual = randomAnswers.some((elem) => elem.translate === randomAnswer.translate);

      if (!isEqual) {
        randomAnswers.push(randomAnswer);
      }
    }

    if (randomAnswers.length === MagicNumbers.NUMBER_OF_RESPONSES) {
      setAnswers(shuffle(randomAnswers));
    }
  };

  const getData = async (num?: number) => {
    try {
      const randomPage = random(MagicNumbers.MIN_PAGE, MagicNumbers.MAX_PAGE);
      const result = await getWords(num ? num : 0, randomPage).then((value) => value);
      if (result) {
        setWordData(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const startGame = () => {
    const startGame = document.querySelector('.startGame-popup') as HTMLElement;
    const cardQuestion = document.querySelector('.audioChallenge-question') as HTMLElement;
    const selectLevel = document.querySelector('.game-settings_level') as HTMLElement;
    cardQuestion.classList.remove('hide-popup');
    startGame.classList.add('hide-popup');
    selectLevel.setAttribute('disabled', 'true');
    getCurrectAnswer();
  };

  const changeLevel = (level: string) => {
    getData(Number(level));
  };

  const increaseQuestionNumber = () => {
    setNumQuestion((prevValue) => prevValue + 1);
  };

  const showCurrectAnswerButton = () => {
    const answers = document.querySelectorAll('.audioChallenge-question__answers-item');
    const button = document.querySelector('.audioChallenge-question__button') as HTMLButtonElement;
    answers.forEach((elem) => {
      if (elem.textContent !== currectAnswer.translate) {
        elem.classList.add('wrong-answers');
      }
      elem.setAttribute('disabled', 'true');
    });
    button.textContent = Text.NextButton;
  };

  const playSound = (path: string) => {
    const audioObj = new Audio(`${path}`);
    audioObj.play();
  };

  const answerCheck = (event: SyntheticEvent) => {
    const target = event.target as HTMLElement;

    const answer: Word = {
      audio: currectAnswer.audio,
      word: currectAnswer.word,
      translate: target.textContent ? target.textContent : '',
    };

    if (
      target &&
      answer &&
      currectAnswer &&
      target.textContent === currectAnswer.translate &&
      numQuestion < MagicNumbers.MAX_QUESTION_NUMBER
    ) {
      setResultsAllAnswers((prevAnswer) => {
        return {
          ...prevAnswer,
          rightAnswer: [...prevAnswer.rightAnswer, answer],
        };
      });
      setSeriesOfCorrectAnswers((prev) => prev + 1);
      playSound(correctAnswerAudio);
      setScore((prevScore) => prevScore + MagicNumbers.BASIC_SCORE);
      increaseQuestionNumber();
      getCurrectAnswer();
    } else if (target.textContent !== currectAnswer.translate) {
      if (longestSeriesCorrectAnswers < seriesOfCorrectAnswers) {
        setLongestSeriesCorrectAnswers(seriesOfCorrectAnswers);
      }
      setSeriesOfCorrectAnswers(0);
      setResultsAllAnswers((prevAnswer) => {
        return {
          ...prevAnswer,
          wrongAnswer: [...prevAnswer.wrongAnswer, answer],
        };
      });
      changeImg();
      playSound(incorrectAnswerAudio);
      showCurrectAnswerButton();
    }

    if (numQuestion === MagicNumbers.MAX_QUESTION_NUMBER) {
      showResult();
    }
  };

  const changeImg = () => {
    const img = document.querySelector('.audioChallenge-question__img') as HTMLImageElement;
    if (img.getAttribute('alt') === Text.IconAttributeAudioChallenge) {
      img.setAttribute('src', `${API.URL + currectAnswer.img}`);
      img.setAttribute('alt', `${currectAnswer.word}`);
    } else {
      img.setAttribute('src', dynamic);
      img.setAttribute('alt', Text.IconAttributeAudioChallenge);
    }
  };

  const showResult = () => {
    playSound(gameOverAudio);
    const audioChallengeQuestion = document.querySelector(
      '.audioChallenge-question'
    ) as HTMLElement;
    const resultPopUp = document.querySelector('.results') as HTMLElement;
    audioChallengeQuestion.classList.add('hide-popup');
    resultPopUp.classList.remove('hide-popup');
    getStatistics();
  };

  const closeResults = () => {
    resetGame();
    const startGame = document.querySelector('.startGame-popup') as HTMLElement;
    const resultPopUp = document.querySelector('.results') as HTMLElement;
    const selectLevel = document.querySelector('.game-settings_level') as HTMLElement;
    resultPopUp.classList.add('hide-popup');
    startGame.classList.remove('hide-popup');
    selectLevel.removeAttribute('disabled');
    getData();
  };

  const soundWord = () => {
    setTimeout(() => {
      setCurrectAnswer((prevAnswer) => {
        const audioObj = new Audio(`${API.URL}${prevAnswer.audio}`);
        if (audioObj.played) {
          audioObj.play();
        }
        return prevAnswer;
      });
    }, 100);
  };

  const handleQuestionButton = (event: SyntheticEvent) => {
    const target = event.target as HTMLButtonElement;

    const answer: Word = {
      audio: currectAnswer.audio,
      word: currectAnswer.word,
      translate: currectAnswer.translate,
    };

    if (target.textContent === Text.ShowCurrectAnswerButton) {
      if (longestSeriesCorrectAnswers < seriesOfCorrectAnswers) {
        setLongestSeriesCorrectAnswers(seriesOfCorrectAnswers);
      }
      setSeriesOfCorrectAnswers(0);
      showCurrectAnswerButton();
      setResultsAllAnswers((prevAnswer) => {
        return {
          ...prevAnswer,
          wrongAnswer: [...prevAnswer.wrongAnswer, answer],
        };
      });
      changeImg();
    } else if (
      target.textContent !== Text.ShowCurrectAnswerButton &&
      numQuestion < MagicNumbers.MAX_QUESTION_NUMBER
    ) {
      const answers = document.querySelectorAll('.audioChallenge-question__answers-item');
      const wrongAnswers = document.querySelectorAll('.wrong-answers');
      if (wrongAnswers) {
        wrongAnswers.forEach((elem) => {
          elem.classList.remove('wrong-answers');
        });
      }
      answers.forEach((elem) => {
        elem.removeAttribute('disabled');
      });
      target.textContent = Text.ShowCurrectAnswerButton;
      increaseQuestionNumber();
      getCurrectAnswer();
      changeImg();
    } else if (
      target.textContent !== Text.ShowCurrectAnswerButton &&
      numQuestion === MagicNumbers.MAX_QUESTION_NUMBER
    ) {
      showResult();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="audioChallenge-wrapper">
      <SettingGame changeLevel={changeLevel} />
      <StartGame
        header={Text.HeaderAudioChallengePopUp}
        subtitle={Text.SubtitleAudioChallengePopUp}
        callback={startGame}
      />

      <div className="audioChallenge-question hide-popup">
        <div className="audioChallenge-question__numQuestion">{numQuestion + 1} / 20</div>
        <img
          onClick={soundWord}
          className="audioChallenge-question__img"
          src={dynamic}
          alt={Text.IconAttributeAudioChallenge}
        />
        <div className="audioChallenge-question__answers">
          {answers.map((elem) => {
            return (
              <button
                key={elem.word}
                onClick={(e) => {
                  answerCheck(e);
                }}
                className="audioChallenge-question__answers-item"
              >
                {elem.translate}
              </button>
            );
          })}
        </div>
        <Button
          className="audioChallenge-question__button"
          onClick={(e) => {
            handleQuestionButton(e);
          }}
          variant="secondary"
        >
          {Text.ShowCurrectAnswerButton}
        </Button>
      </div>

      <ResultGamePopup
        score={score}
        resultsAllAnswers={resultsAllAnswers}
        closePopUp={closeResults}
      />
    </div>
  );
};
