import { random } from 'lodash';
import { shuffle } from 'lodash';
import { Word, Answers } from '../../../types/types';
import { StartGame } from '../../../components/startGamePopup/startGame';
import { ResultGamePopup } from '../../../components/resultGamePopup/resultGamePopup';
import { useCallback, useEffect, useState } from 'react';
import { SettingGame } from '../../../components/settingsGame/settingsGame';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { getWords } from '../../../store/asyncReducers/wordsBookSlice';
import { Timer } from '../../../components/timer/timer';
import { QuestionCard } from '../../../components/questionCard/questionCard';
import './sprint.sass';
const correctAnswer = '../../../assets/audio/correctAnswer.mp3';
const incorrectAnswer = '../../../assets/audio/incorrectAnswer.mp3';
const end = '../../../assets/audio/end.mp3';
//  export const Sprint: React.FC = () => {
//    const [question, setQuestion] = useState<Question>({
//      word: '',
//      translate: '',
//      answer: true,
//      audio: '',
//    });
//    const [resultsAllAnswers, setResultsAllAnswers] = useState<Answers>({
//      rightAnswer: [],
//      wrongAnswer: [],
//    });
//    const [wordData, setWordData] = useState<Word[]>([]);
//    const [numQuestion, setNumQuestion] = useState(0);
//    const [indicatorNumber, setIndicatorNumber] = useState(0);

//    const [mute, setMute] = useState(true);
//    const [score, setScore] = useState(0);
//    const [seriesOfCorrectAnswers, setSeriesOfCorrectAnswers] = useState(0);
//    const [longestSeriesCorrectAnswers, setLongestSeriesCorrectAnswers] = useState(0);
//    const state: IReduxState = useSelector((state: IReduxState) => state);
//    const dispatch = useDispatch();

//    const getDate = () => {
//      const date = new Date();
//      let day = String(date.getDate());
//      if (day.length < 2) day = '0' + day;
//      let month = String(date.getMonth() + 1);
//      if (month.length < 2) month = '0' + month;
//      const year = date.getFullYear();
//      return `${day}.${month}.${year}`;
//    };

//    const getStatistics = () => {
//      const statistics = {
//        lastActivity: '',
//        corectAnswers: 0,
//        persent: 0,
//        wins: 0,
//      };
//      statistics.lastActivity = getDate();

//      setResultsAllAnswers((prevAnswer) => {
//        const sumAllAnswers = prevAnswer.rightAnswer.length + prevAnswer.wrongAnswer.length;
//        const sumAllCurrectAnswers = prevAnswer.rightAnswer.length;
//        statistics.corectAnswers = sumAllCurrectAnswers;
//        statistics.persent = Math.round(
//          (sumAllCurrectAnswers / sumAllAnswers) * MagicNumbers.PERCENT
//        );
//        return {
//          ...prevAnswer,
//        };
//      });

//      setLongestSeriesCorrectAnswers((prevValue) => {
//        statistics.wins = prevValue;
//        return prevValue;
//      });

//      if (state.IsLogin === true) {
//         putStatistic(statistics, RequestStatistic.sprint, dispatch);
//      }
//    };

//  const changeLevel = (level: string) => {
//    setLevel(Number(level));
//     getData(Number(level));
//  };

//    const resetGame = () => {
//      setNumQuestion(0);
//      setIndicatorNumber(0);
//      setScore(0);
//      setSeriesOfCorrectAnswers(0);
//      setResultsAllAnswers({
//        rightAnswer: [],
//        wrongAnswer: [],
//      });
//    };

//    const changeIndicatorNumber = () => {
//      if (indicatorNumber !== 2) {
//        setIndicatorNumber((prevIndicatorNumber) => prevIndicatorNumber + 1);
//      } else {
//        setIndicatorNumber(0);
//      }
//    };

//    const changeMute = (event: SyntheticEvent) => {
//      const target = event.target as HTMLImageElement;
//      if (mute) {
//        setMute(false);
//        target.setAttribute('src', muteImg);
//      } else {
//        setMute(true);
//        target.setAttribute('src', audioImg);
//      }
//    };

//    const startAudio = (path: string) => {
//      setMute((prevMute) => {
//        if (prevMute) {
//          const audioObj = new Audio(`${path}`);
//          audioObj.play();
//        }
//        return prevMute;
//      });
//    };

//    const clearIndicators = () => {
//      const indicators = document.querySelectorAll('.question-card_indicators__item');
//      indicators.forEach((item) => {
//        item.classList.remove('correct-answer_indicator__1');
//        item.classList.remove('correct-answer_indicator__2');
//        item.classList.remove('correct-answer_indicator__3');
//      });
//    };

//    const changeScore = (answer: boolean) => {
//      const indicators = document.querySelectorAll('.question-card_indicators__item');
//      if (answer) {
//        if (seriesOfCorrectAnswers < MagicNumbers.SERIES_OF_CORRECT_ANSWERS_1) {
//          setScore((prevScore) => prevScore + MagicNumbers.BASIC_SCORE);
//          indicators[indicatorNumber].classList.add('correct-answer_indicator__1');
//        } else if (
//          seriesOfCorrectAnswers >= MagicNumbers.SERIES_OF_CORRECT_ANSWERS_1 &&
//          seriesOfCorrectAnswers < MagicNumbers.SERIES_OF_CORRECT_ANSWERS_2
//        ) {
//          setScore((prevScore) => prevScore + MagicNumbers.BONUS_SCORE);
//          indicators[indicatorNumber].classList.add('correct-answer_indicator__2');
//        } else if (seriesOfCorrectAnswers >= MagicNumbers.SERIES_OF_CORRECT_ANSWERS_2) {
//          setScore((prevScore) => prevScore + MagicNumbers.SUPER_BONUS_SCORE);
//          indicators[indicatorNumber].classList.add('correct-answer_indicator__3');
//        }
//        changeIndicatorNumber();
//        setSeriesOfCorrectAnswers((prev) => prev + 1);
//      } else {
//        if (longestSeriesCorrectAnswers < seriesOfCorrectAnswers) {
//          setLongestSeriesCorrectAnswers(seriesOfCorrectAnswers);
//        }
//        setSeriesOfCorrectAnswers(0);
//        setIndicatorNumber(0);
//        clearIndicators();
//      }
//    };

//    const closePopUp = () => {
//      const resultPopUp = document.querySelector('.results') as HTMLElement;
//      const sprintPopUp = document.querySelector('.startGame-popup') as HTMLElement;
//      const questionСard = document.querySelector('.question-card') as HTMLElement;
//      const timerElem = document.getElementById('timer') as HTMLElement;
//      resultPopUp?.classList.add('hide-popup');
//      questionСard?.classList.add('hide-popup');
//      timerElem?.classList.add('hide-popup');
//      sprintPopUp?.classList.remove('hide-popup');
//      resetGame();
//    };

//    const showResult = () => {
//      const resultPopUp = document.querySelector('.results') as HTMLElement;
//      const selectLevel = document.querySelector('.game-settings_level') as HTMLElement;
//      resultPopUp.classList.remove('hide-popup');
//      selectLevel.removeAttribute('disabled');
//      getStatistics();
//      startAudio(end);
//    };

//     const responseСheck = (answer: boolean) => {
//       const questionCard = document.querySelector('.question-card') as HTMLElement;
//       if (question.answer === answer && questionCard) {
//         setResultsAllAnswers((prevAnswer) => {
//           return {
//             ...prevAnswer,
//             rightAnswer: [...prevAnswer.rightAnswer, question],
//           };
//         });

//         changeScore(true);
//         startAudio(correctAnswer);
//         questionCard.classList.add('right-answer');
//         setTimeout(() => {
//           questionCard.classList.remove('right-answer');
//         }, 400);
//       } else {
//         setResultsAllAnswers((prevAnswer) => {
//           return {
//             ...prevAnswer,
//             wrongAnswer: [...prevAnswer.wrongAnswer, question],
//           };
//         });
//         changeScore(false);
//         startAudio(incorrectAnswer);
//         questionCard.classList.add('wrong-answer');
//         setTimeout(() => {
//           questionCard.classList.remove('wrong-answer');
//         }, 400);
//       }
//       if (numQuestion === 19) {
//         setNumQuestion(0);
//         getData();
//       }
//       setTimeout(() => {
//         createQuestion();
//       }, 100);
//     };

//    const createQuestion = () => {
//      if (numQuestion === 20) {
//      } else if (wordData && numQuestion < MagicNumbers.MAX_NUM_OF_QUESTIONS) {
//        const randomNum = random(0, 1);
//        const question = {
//          word: wordData[numQuestion].word,
//          translate: wordData[numQuestion + randomNum].wordTranslate,
//          audio: wordData[numQuestion].audio,
//          answer: randomNum === 0 ? true : false,
//        };
//        setNumQuestion((prevNumQuestion) => prevNumQuestion + 1);
//        setQuestion(question);
//      }
//    };

//    const getData = useCallback(async (num?: number) => {
//       try {
//         const randomPage = random(0, 29);
//         const result = await getWords(num ? num : level, randomPage).then((value) => value);
//         if (result) {
//           setWordData(result);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//    }, []);

//    const start = () => {
//      getData();
//      clearIndicators();
//      timer(showResult);
//      createQuestion();
//    };

//    useEffect(() => {
//      getData();
//    }, [getData]);

//    return (
//      <div className="sprint-wrapper">
//        <SettingGame changeLevel={changeLevel} />
//        <StartGame
//          header={Text.HeaderSprintPopUp}
//          subtitle={Text.SubtitleSprintPopUp}
//          callback={start}
//        />

//        <div className="wrapper-question-card">
//          <div id="timer" className="hide-popup"></div>
//          <div className="question-card hide-popup">
//            <div className="question-card__settings">
//              <div className="question-card_indicators">
//                <div className="question-card_indicators__item"></div>
//                <div className="question-card_indicators__item"></div>
//                <div className="question-card_indicators__item"></div>
//              </div>
//              <img
//                onClick={(e) => {
//                  changeMute(e);
//                }}
//                className="results-answers_icon"
//                src={audioImg}
//                alt="audio-icon"
//              />
//            </div>

//            <p className="question-card__score">
//              Очки: <span>{score}</span>
//            </p>
//            <p className="question-card__word">{question.word}</p>
//            <p className="question-card__translate">{question.translate}</p>
//            <Button
//              className="question-card_btn"
//              onClick={() => {
//                 responseСheck(false);
//              }}
//              variant="danger"
//            >
//              {Text.WrongAnswerSprintButton}
//            </Button>
//            <Button
//              className="question-card_btn"
//              onClick={() => {
//                 responseСheck(true);
//              }}
//              variant="success"
//            >
//              {Text.RightAnswerSprintButton}
//            </Button>
//          </div>
//        </div>

//        <ResultGamePopup
//          score={score}
//          resultsAllAnswers={resultsAllAnswers}
//          closePopUp={closePopUp}
//        />
//      </div>
//    );
//  };

export const Sprint: React.FC = () => {
  const dispatch = useAppDispatch();
  const [level, setLevel] = useState(0);
  const [score, setScore] = useState(0);
  const { bookWords, isUseBookWords } = useAppSelector((state) => state.wordsSlice);
  const { difficultWords } = useAppSelector((state) => state.aggregatedWordsSlice);
  const [isGame, setIsGame] = useState(false);
  const [indicator, setIndicator] = useState<boolean | undefined>(undefined);
  const [numQuestion, setNumQuestion] = useState(0);
  const [answer, setAnswer] = useState<string>();
  const [gameWord, setGameWord] = useState<Word[]>();
  const [resultsAllAnswers, setResultsAllAnswers] = useState<Answers>({
    rightAnswer: [],
    wrongAnswer: [],
  });
  const [isShowPopUp, setIsShowPopUp] = useState(false);

  const resetGame = () => {
    setNumQuestion(0);
    setScore(0);
    //  setSeriesOfCorrectAnswers(0);
    setResultsAllAnswers({
      rightAnswer: [],
      wrongAnswer: [],
    });
  };

  const closePopUp = () => {
    setIsShowPopUp(false);
    resetGame();
  };

  const changeLevel = (level: string) => {
    setLevel(Number(level));
    // getData(Number(level));
  };

  const audioPlay = (path: string) => {
    const audioObj = new Audio(`${path}`);
    audioObj.play();
  };

  const start = () => {
    setIsGame(true);
  };

  const stopGame = () => {
    setIsGame(false);
    setIsShowPopUp(true);
  };

  const activateIndicator = (current: boolean) => {
    setIndicator(current);
    setTimeout(() => {
      setIndicator(undefined);
    }, 500);
  };

  const writeDownCorrectAnswer = (word: Word) => {
    setResultsAllAnswers((prevState) => {
      return {
        rightAnswer: [...prevState.rightAnswer, word],
        wrongAnswer: [...prevState.wrongAnswer],
      };
    });
  };

  const writeDownWrongAnswer = (word: Word) => {
    setResultsAllAnswers((prevState) => {
      return {
        rightAnswer: [...prevState.rightAnswer],
        wrongAnswer: [...prevState.wrongAnswer, word],
      };
    });
  };

  const changeSumScore = (value: number) => {
    score + value > 0 ? setScore(score + value) : null;
  };

  const responseСheck = (userResponse: boolean) => {
    console.log(resultsAllAnswers);
    if (gameWord) {
      if (gameWord[numQuestion].wordTranslate === answer && userResponse) {
        writeDownCorrectAnswer(gameWord[numQuestion]);
        changeSumScore(10);
        activateIndicator(true);
      } else if (gameWord[numQuestion].wordTranslate !== answer && !userResponse) {
        writeDownCorrectAnswer(gameWord[numQuestion]);
        changeSumScore(10);
        activateIndicator(true);
      } else {
        writeDownWrongAnswer(gameWord[numQuestion]);
        changeSumScore(-10);
        activateIndicator(false);
      }
    }

    nextQuestion();
  };

  const nextQuestion = () => {
    if (numQuestion <= 20) {
      setNumQuestion(numQuestion + 1);
      createAnswer();
    }
  };

  const createAnswer = useCallback(
    (words?: Word[]) => {
      if (words) {
        setAnswer(words[random(numQuestion, numQuestion + 1)].wordTranslate);
      } else if (!words && gameWord) {
        setAnswer(gameWord[random(numQuestion, numQuestion + 1)].wordTranslate);
      }
    },
    [gameWord, numQuestion]
  );

  const getGameWords = useCallback(async () => {
    // Если флаг true использовать слова со страницы учебника с которой перешел пользователь
    if (isUseBookWords && bookWords) {
      setGameWord(shuffle(bookWords));
      createAnswer(bookWords);
      // Если флаг false, слов пользователя более 20 то использовать их
    } else if (!isUseBookWords && difficultWords && difficultWords.paginatedResults.length >= 20) {
      setGameWord(shuffle(difficultWords.paginatedResults));
      createAnswer(difficultWords.paginatedResults);
      // Если меньше то взять из учебника того же уровня с рандомной страницы
    } else if (!isUseBookWords && difficultWords && difficultWords.paginatedResults.length < 20) {
      let gameWord: Word[] = [];
      const response = await dispatch(getWords({ group: level, page: random(0, 19) }));
      if (response.meta.requestStatus === 'fulfilled') {
        gameWord = shuffle(gameWord.concat(response.payload, difficultWords.paginatedResults));
        setGameWord(gameWord);
        createAnswer(gameWord);
      }
      // В любых других ситуациях использовать слова из книги выбранного уровня, рандомной страницы
    } else {
      const response = await dispatch(getWords({ group: level, page: random(0, 19) }));
      if (response.meta.requestStatus === 'fulfilled') {
        setGameWord(response.payload);
        createAnswer(response.payload);
      }
    }
  }, [bookWords, createAnswer, difficultWords, dispatch, isUseBookWords, level]);

  useEffect(() => {
    getGameWords();
  }, []);

  return (
    <div className="sprint-wrapper">
      <SettingGame changeLevel={changeLevel} />
      {isGame && gameWord ? <Timer value={60} stopGame={stopGame} /> : null}
      {!isGame && !isShowPopUp ? (
        <StartGame
          header="Спринт"
          subtitle="Выберите соответсвует ли перевод предложенному слову"
          callback={start}
        />
      ) : null}
      {isGame && gameWord && answer ? (
        <QuestionCard
          indicator={indicator}
          word={gameWord[numQuestion].word}
          translate={answer}
          responseCheck={responseСheck}
          score={score}
        />
      ) : null}
      {isShowPopUp ? (
        <ResultGamePopup
          score={score}
          resultsAllAnswers={resultsAllAnswers}
          closePopUp={closePopUp}
        />
      ) : null}
    </div>
  );
};
