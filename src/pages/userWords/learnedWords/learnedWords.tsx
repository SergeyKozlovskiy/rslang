import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { AggregatedWords, DecodeToken, Word } from '../../../types/types';
import { useCookies } from 'react-cookie';
import { deleteUserWord } from '../../../store/asyncReducers/wordsUserSlice';
import { getLearnedWords } from '../../../store/asyncReducers/aggregatedWordsSlice';
import { LEVELS } from '../../../types/constants';
import { decodeToken } from 'react-jwt';
import { getNewToken, authSlice } from '../../../store/asyncReducers/authSlice';
import { Preloader } from '../../../components/Preloader/Preloader';
import { WordBlock } from '../../../components/WordBlock/WordBlock';
import { NotFoundWord } from '../../../components/NotFoundWord/NotFoundWord';
import { Title } from '../../../components/Title/Title';

export const LearnedWords: React.FC = () => {
  const [cookie] = useCookies(['token', 'userId', 'refreshToken']);
  const { learnedWords, isLoading } = useAppSelector((state) => state.aggregatedWordsSlice);
  const { EnglishLevel } = useAppSelector((state) => state.wordsSlice);
  const [detailWord, setDetailWord] = useState<Word>();
  const dispatch = useAppDispatch();

  const showDetailWord = (word: Word) => {
    setDetailWord(word);
  };

  const deleteWord = async () => {
    if (detailWord) {
      const response = await dispatch(
        deleteUserWord({
          userId: cookie.userId,
          token: cookie.token,
          wordId: detailWord._id,
        })
      );
      if (response.meta.requestStatus === 'fulfilled') {
        getUserLearnedtWords();
      }
    }
  };

  const getUserLearnedtWords = useCallback(
    async (level?, page?) => {
      if (cookie.userId && cookie.token) {
        const response = await dispatch(
          getLearnedWords({
            userId: cookie.userId,
            token: cookie.token,
            level: level ? level : LEVELS[EnglishLevel],
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
    [cookie.refreshToken, cookie.token, cookie.userId, dispatch, EnglishLevel]
  );

  useEffect(() => {
    getUserLearnedtWords();
  }, [getUserLearnedtWords]);

  return (
    <>
      <Title text="Изученные слова" />
      {isLoading ? (
        <Preloader />
      ) : learnedWords?.totalCount[0].count ? (
        <WordBlock
          searchCount={learnedWords.totalCount[0].count}
          showDetailWord={showDetailWord}
          detailWord={detailWord}
          handleClickButton={deleteWord}
          words={learnedWords.paginatedResults}
          textButton="Удалить"
          textLink="Перейти в словарь"
          path="../userWords/difficultWords"
          getNewWords={getUserLearnedtWords}
        />
      ) : (
        <NotFoundWord
          total={learnedWords ? learnedWords.totalCount[0].count : 0}
          getNewWords={getUserLearnedtWords}
        />
      )}
    </>
  );
};
