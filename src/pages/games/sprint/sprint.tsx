import { random } from 'lodash';
import { shuffle } from 'lodash';
import { Word, Answers, Statistics } from '../../../types/types';
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
import { putStatistics } from '../../../store/asyncReducers/statisticsSlice';
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
  const [seriesCorrectAnswer, setSeriesCorrectAnswer] = useState({ serries: 0, maxSerries: 0 });

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

  const stopGame = () => {
    setIsGame(false);
    setIsShowPopUp(true);
    collectionsForStatistics();
    audioPlay(end);
  };

  const updateStatistics = async (statistics: Statistics) => {
    if (cookies.token && cookies.userId) {
      dispatch(
        putStatistics({
          token: cookies.token,
          userId: cookies.userId,
          sumNewWordInDaySprint: statistics.sumNewWordInDay,
          procCorrectAnswerSprint: statistics.procCorrectAnswer,
          seriesCorrectAnswerSprint: statistics.seriesCorrectAnswer,
        })
      );
    }
  };

  const collectionsForStatistics = () => {
    const statistics = {
      sumNewWordInDay: resultsAllAnswers.rightAnswer.length,
      procCorrectAnswer: 0,
      seriesCorrectAnswer:
        seriesCorrectAnswer.serries > seriesCorrectAnswer.maxSerries
          ? seriesCorrectAnswer.serries
          : seriesCorrectAnswer.maxSerries,
      date: new Date(),
    };
    if (resultsAllAnswers.rightAnswer && resultsAllAnswers.wrongAnswer) {
      statistics.procCorrectAnswer = Math.round(
        (resultsAllAnswers.rightAnswer.length /
          (resultsAllAnswers.rightAnswer.length + resultsAllAnswers.wrongAnswer.length)) *
          100
      );
    }
    updateStatistics(statistics);
  };

  const updateSeriesCorrectAnswer = (answer: boolean) => {
    if (answer) {
      setSeriesCorrectAnswer((prevState) => {
        return { serries: prevState.serries + 1, maxSerries: prevState.maxSerries };
      });
    } else {
      setSeriesCorrectAnswer((prevState) => {
        return {
          serries: 0,
          maxSerries:
            prevState.serries > prevState.maxSerries ? prevState.serries : prevState.maxSerries,
        };
      });
    }
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
        updateSeriesCorrectAnswer(true);
        audioPlay(correctAnswer);
      } else if (gameWord[numQuestion].wordTranslate !== answer && !userResponse) {
        writeDownCorrectAnswer(gameWord[numQuestion]);
        changeSumScore(10);
        activateIndicator(true);
        updateSeriesCorrectAnswer(true);
        audioPlay(correctAnswer);
      } else {
        writeDownWrongAnswer(gameWord[numQuestion]);
        changeSumScore(-10);
        activateIndicator(false);
        updateSeriesCorrectAnswer(false);
        audioPlay(incorrectAnswer);
      }
    }
    nextQuestion();
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

  const nextQuestion = async () => {
    if (numQuestion === 17 || numQuestion === 37) {
      const response = await dispatch(getWords({ group: level, page: random(0, 19) }));
      if (response.meta.requestStatus === 'fulfilled') {
        setGameWord((prevState) => {
          return prevState ? [...prevState, ...response.payload] : [...response.payload];
        });
      }
    }
    setNumQuestion(numQuestion + 1);
    createAnswer();
  };

  useEffect(() => {
    const getGameWords = async () => {
      if (isUseBookWords && bookWords) {
        setGameWord(shuffle(bookWords));
        createAnswer(bookWords);
      } else if (
        !isUseBookWords &&
        difficultWords &&
        difficultWords.paginatedResults.length >= 20
      ) {
        setGameWord(shuffle(difficultWords.paginatedResults));
        createAnswer(difficultWords.paginatedResults);
      } else if (!isUseBookWords && difficultWords && difficultWords.paginatedResults.length < 20) {
        let gameWord: Word[] = [];
        const response = await dispatch(getWords({ group: level, page: random(0, 19) }));
        if (response.meta.requestStatus === 'fulfilled') {
          gameWord = shuffle(gameWord.concat(response.payload, difficultWords.paginatedResults));
          setGameWord(gameWord);
          createAnswer(gameWord);
        }
      } else {
        const response = await dispatch(getWords({ group: level, page: random(0, 19) }));
        if (response.meta.requestStatus === 'fulfilled') {
          setGameWord(response.payload);
          createAnswer(response.payload);
        }
      }
    };
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
