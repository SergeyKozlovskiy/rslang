import { random, shuffle } from 'lodash';
import { useEffect, useState } from 'react';
import { ResultGame } from '../../../components/ResultGamePopup/ResultGame';
import { SettingGame } from '../../../components/SettingsGame/SettingsGame';
import { PopUp } from '../../../components/StartGamePopup/PopUp';
import { audioPlay } from '../../../services/audioPlay';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { getWords } from '../../../store/asyncReducers/wordsBookSlice';
import { Answers, ResponseStatistics, StatisticsAudioChallenge, Word } from '../../../types/types';
import end from '../../../assets/audio/end.mp3';
import { useCookies } from 'react-cookie';
import { getStatistics, putStatistics } from '../../../store/asyncReducers/statisticsSlice';
import { QuestionCard } from '../../../components/QuestionCard/AudioChallenge/QuestionCard';
import './AudioChallenge.sass';

export const AudioChallenge: React.FC = () => {
  const dispatch = useAppDispatch();
  const [cookies] = useCookies(['token', 'userId']);
  const [level, setLevel] = useState(0);
  const [isGame, setIsGame] = useState(false);
  const [isShowPopUp, setIsShowPopUp] = useState(false);
  const [score, setScore] = useState(0);
  const [numQuestion, setNumQuestion] = useState(0);
  const [seriesCorrectAnswer, setSeriesCorrectAnswer] = useState({ serries: 0, maxSerries: 0 });
  const [gameWord, setGameWord] = useState<Word[]>();
  const [answers, setAnswers] = useState<Word[]>();
  const { difficultWords } = useAppSelector((state) => state.aggregatedWordsSlice);
  const { bookWords, isUseBookWords } = useAppSelector((state) => state.wordsSlice);
  const [resultsAllAnswers, setResultsAllAnswers] = useState<Answers>({
    rightAnswer: [],
    wrongAnswer: [],
  });

  const stopGame = () => {
    setIsGame(false);
    setIsShowPopUp(true);
    collectionsForStatistics();
    audioPlay(end);
  };

  const resetGame = () => {
    setNumQuestion(0);
    setScore(0);
    setSeriesCorrectAnswer({ serries: 0, maxSerries: 0 });
    setResultsAllAnswers({
      rightAnswer: [],
      wrongAnswer: [],
    });
  };

  const closePopUp = () => {
    setIsShowPopUp(false);
    resetGame();
  };

  const updateStatistics = async (statistics: StatisticsAudioChallenge) => {
    if (cookies.token && cookies.userId) {
      const response = await dispatch(
        getStatistics({ token: cookies.token, userId: cookies.userId })
      );
      if (response.meta.requestStatus === 'fulfilled') {
        const responseStatistics = response.payload as ResponseStatistics;
        dispatch(
          putStatistics({
            token: cookies.token,
            userId: cookies.userId,
            sumNewWordInDaySprint: responseStatistics.optional.sumNewWordInDaySprint,
            procCorrectAnswerSprint: responseStatistics.optional.procCorrectAnswerSprint,
            seriesCorrectAnswerSprint: responseStatistics.optional.seriesCorrectAnswerSprint,
            sumNewWordInDayAudioChallenge: statistics.sumNewWordInDayAudioChallenge,
            procCorrectAnswerAudioChallenge: statistics.procCorrectAnswerAudioChallenge,
            seriesCorrectAnswerAudioChallenge: statistics.seriesCorrectAnswerAudioChallenge,
          })
        );
      }
    }
  };

  const collectionsForStatistics = () => {
    const statistics = {
      sumNewWordInDayAudioChallenge: resultsAllAnswers.rightAnswer.length,
      procCorrectAnswerAudioChallenge: 0,
      seriesCorrectAnswerAudioChallenge:
        seriesCorrectAnswer.serries > seriesCorrectAnswer.maxSerries
          ? seriesCorrectAnswer.serries
          : seriesCorrectAnswer.maxSerries,
    };
    if (resultsAllAnswers.rightAnswer && resultsAllAnswers.wrongAnswer) {
      statistics.procCorrectAnswerAudioChallenge = Math.round(
        (resultsAllAnswers.rightAnswer.length /
          (resultsAllAnswers.rightAnswer.length + resultsAllAnswers.wrongAnswer.length)) *
          100
      );
    }
    updateStatistics(statistics);
  };
  const start = () => {
    setIsGame(true);
  };

  const createAnswers = (words?: Word[]) => {
    const answers = new Set<Word>();
    if (words) {
      answers.add(words[numQuestion]);
      while (answers.size < 5) {
        answers.add(words[random(0, 19)]);
      }
    } else if (gameWord) {
      answers.add(gameWord[numQuestion + 1]);
      while (answers.size < 5) {
        answers.add(gameWord[random(0, 19)]);
      }
    }
    setAnswers(shuffle(Array.from(answers)));
  };

  const nextQuestion = () => {
    if (numQuestion <= 18) {
      setNumQuestion(numQuestion + 1);
      createAnswers();
    } else {
      stopGame();
    }
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

  const responseСheck = (id: string) => {
    if (gameWord) {
      if (gameWord[numQuestion].id === id) {
        writeDownCorrectAnswer(gameWord[numQuestion]);
        changeSumScore(10);
        nextQuestion();
      } else {
        writeDownWrongAnswer(gameWord[numQuestion]);
        changeSumScore(-10);
        nextQuestion();
      }
    }
  };

  const changeLevel = (level: string) => {
    setLevel(Number(level));
  };

  useEffect(() => {
    const getGameWords = async () => {
      if (isUseBookWords && bookWords) {
        setGameWord(bookWords);
        createAnswers(bookWords);
      } else if (
        !isUseBookWords &&
        difficultWords &&
        difficultWords.paginatedResults.length >= 20
      ) {
        setGameWord(difficultWords.paginatedResults);
        createAnswers(difficultWords.paginatedResults);
      } else if (!isUseBookWords && difficultWords && difficultWords.paginatedResults.length < 20) {
        let gameWord: Word[] = [];
        const response = await dispatch(getWords({ group: level, page: random(0, 19) }));
        if (response.meta.requestStatus === 'fulfilled') {
          gameWord = gameWord.concat(response.payload, difficultWords.paginatedResults);
          setGameWord(gameWord);
          createAnswers(gameWord);
        }
      } else {
        const response = await dispatch(getWords({ group: level, page: random(0, 19) }));
        if (response.meta.requestStatus === 'fulfilled') {
          setGameWord(response.payload);
          createAnswers(response.payload);
        }
      }
    };
    getGameWords();
  }, []);

  return (
    <div className="audioChallenge-wrapper">
      <SettingGame changeLevel={changeLevel} />
      {!isGame && !isShowPopUp ? (
        <PopUp
          header="Аудиовызов"
          subtitle="«Аудиовызов» - это тренировка, которая улучшает восприятие речи на слух."
          callback={start}
        />
      ) : null}
      {isGame && gameWord && answers ? (
        <QuestionCard
          gameWord={gameWord}
          numQuestion={numQuestion}
          nextQuestion={nextQuestion}
          responseСheck={responseСheck}
          writeDownWrongAnswer={writeDownWrongAnswer}
          answers={answers}
        />
      ) : null}
      {isShowPopUp ? (
        <ResultGame score={score} resultsAllAnswers={resultsAllAnswers} closePopUp={closePopUp} />
      ) : null}
    </div>
  );
};
