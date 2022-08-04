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
import { useCookies } from 'react-cookie';
import './sprint.sass';
import { getStatistics } from '../../../store/asyncReducers/statisticsSlice';
const correctAnswer = '../../../assets/audio/correctAnswer.mp3';
const incorrectAnswer = '../../../assets/audio/incorrectAnswer.mp3';
const end = '../../../assets/audio/end.mp3';

export const Sprint: React.FC = () => {
  const dispatch = useAppDispatch();
  const [cookies] = useCookies(['token', 'userId']);
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

  const getStatisticsUser = () => {
    if ((cookies.token, cookies.userId)) {
      dispatch(getStatistics({ token: cookies.token, userId: cookies.userId }));
    }
  };

  const stopGame = () => {
    setIsGame(false);
    setIsShowPopUp(true);
    getStatisticsUser();
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
