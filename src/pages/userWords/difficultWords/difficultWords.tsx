import { useCallback, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { AggregatedWords, DecodeToken, Word } from '../../../types/types';
import { getDifficultWords } from '../../../store/asyncReducers/aggregatedWordsSlice';
import { LEVELS } from '../../../types/constants';
import { changeWord } from '../../../store/asyncReducers/wordsUserSlice';
import { authSlice, getNewToken } from '../../../store/asyncReducers/authSlice';
import { decodeToken } from 'react-jwt';
import { NotFoundWord } from '../../../components/NotFoundWord/NotFoundWord';
import { Preloader } from '../../../components/Preloader/Preloader';
import { WordBlock } from '../../../components/WordBlock/WordBlock';
import { Title } from '../../../components/Title/Title';
import { useNavigate } from 'react-router';
import { wordsSlice } from '../../../store/asyncReducers/wordsBookSlice';

export const DifficultWords: React.FC = () => {
  const [cookie] = useCookies(['name', 'token', 'refreshToken', 'userId']);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const { difficultWords, isLoading } = useAppSelector((state) => state.aggregatedWordsSlice);
  const dispatch = useAppDispatch();
  const [englishLevel, setEnglishLevel] = useState<number>(0);
  const [detailWord, setDetailWord] = useState<Word>();
  const navigate = useNavigate();

  const showDetailWord = (word: Word) => {
    setDetailWord(word);
  };

  const addToLearnedWords = async () => {
    if (detailWord) {
      const response = await dispatch(
        changeWord({
          userId: cookie.userId,
          token: cookie.token,
          wordId: detailWord._id,
          englishLevel: LEVELS[englishLevel],
          isLearned: true,
        })
      );
      if (response.meta.requestStatus === 'fulfilled') {
        getUserDifficultWords();
      }
    }
  };

  const getUserDifficultWords = useCallback(
    async (level?, page?) => {
      if (cookie.userId && cookie.token) {
        const response = await dispatch(
          getDifficultWords({
            userId: cookie.userId,
            token: cookie.token,
            level: level ? level : LEVELS[englishLevel],
          })
        );
        if (response.meta.requestStatus === 'fulfilled') {
          const result = response.payload as AggregatedWords;
          setDetailWord(result.paginatedResults[0]);
        } else if (response.payload.response.status === 401 && 402) {
          if (cookie.refreshToken) {
            const token = decodeToken(cookie.refreshToken) as DecodeToken;
            dispatch(getNewToken({ userId: token.id, refreshToken: cookie.refreshToken }));
          } else {
            dispatch(authSlice.actions.setIsLogin(false));
          }
        }
      }
    },
    [cookie.refreshToken, cookie.token, cookie.userId, dispatch, englishLevel]
  );

  const startGame = () => {
    dispatch(wordsSlice.actions.changeBookWordAccess(false));
    navigate('../games');
  };

  useEffect(() => {
    getUserDifficultWords();
  }, [getUserDifficultWords]);

  return (
    <>
      <Title text="Ваши слова" />
      {isLoading ? (
        <Preloader />
      ) : difficultWords?.paginatedResults.length ? (
        <WordBlock
          searchCount={difficultWords.totalCount[0].count}
          englishLevel={englishLevel}
          setEnglishLevel={setEnglishLevel}
          setPageNumber={setPageNumber}
          pageNumber={pageNumber}
          showDetailWord={showDetailWord}
          detailWord={detailWord}
          handleClickButton={addToLearnedWords}
          words={difficultWords.paginatedResults}
          textButton="Добавить в изученные"
          textLink="Перейти в изученные"
          path="../userWords/learnedWords"
          getNewWords={getUserDifficultWords}
          startGame={startGame}
        />
      ) : (
        <NotFoundWord
          englishLevel={englishLevel}
          setEnglishLevel={setEnglishLevel}
          setPageNumber={setPageNumber}
          pageNumber={pageNumber}
          total={difficultWords ? difficultWords.paginatedResults.length : 0}
          getNewWords={getUserDifficultWords}
        />
      )}
    </>
  );
};
