import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { getWords, wordsSlice } from '../../../store/asyncReducers/wordsBookSlice';
import { Word } from '../../../types/types';
import { useCookies } from 'react-cookie';
import { saveWord } from '../../../store/asyncReducers/wordsUserSlice';
import { LEVELS } from '../../../types/constants';
import { WordBlock } from '../../../components/WordBlock/WordBlock';
import { NotFoundWord } from '../../../components/NotFoundWord/NotFoundWord';
import { Title } from '../../../components/Title/Title';
import { Preloader } from '../../../components/Preloader/Preloader';
import './WordsPage.sass';

export const WordsPage: React.FC = () => {
  const { bookWords, isLoading } = useAppSelector((state) => state.wordsSlice);
  const [cookie] = useCookies(['name', 'token', 'refreshToken', 'userId']);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [englishLevel, setEnglishLevel] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(6);
  const [detailWord, setDetailWord] = useState<Word>();

  const showDetailWord = (word: Word) => {
    setDetailWord(word);
  };

  const addToDictionary = () => {
    if (cookie.token && cookie.userId && detailWord)
      dispatch(
        saveWord({
          userId: cookie.userId,
          token: cookie.token,
          wordId: detailWord.id,
          englishLevel: LEVELS[englishLevel],
          isLearned: false,
        })
      );
  };

  const getNewWords = (level: number | null, page: number | null) => {
    if (level !== null) {
      setPageNumber((page) => {
        dispatch(getWords({ group: level, page: page }));
        return page;
      });
    } else if (page !== null) {
      setEnglishLevel((level) => {
        dispatch(getWords({ group: level, page: page }));
        return level;
      });
    }
  };

  const startGame = () => {
    dispatch(wordsSlice.actions.changeBookWordAccess(true));
    navigate('../games');
  };

  useEffect(() => {
    const getData = async () => {
      if (bookWords) {
        setDetailWord(bookWords[0]);
      } else {
        const result = await dispatch(getWords({ group: 0, page: 6 }));
        if (result.meta.requestStatus === 'fulfilled') {
          setDetailWord(result.payload[0]);
        }
      }
    };
    getData();
  }, [dispatch, navigate, bookWords]);

  return (
    <>
      <Title text="Учебник" />
      {isLoading ? (
        <Preloader />
      ) : bookWords ? (
        <WordBlock
          searchCount={580}
          englishLevel={englishLevel}
          setEnglishLevel={setEnglishLevel}
          setPageNumber={setPageNumber}
          pageNumber={pageNumber}
          showDetailWord={showDetailWord}
          detailWord={detailWord}
          handleClickButton={addToDictionary}
          words={bookWords}
          textButton="Добавить в словарь"
          textLink="Перейти в словарь"
          path="../userWords"
          getNewWords={getNewWords}
          startGame={startGame}
        />
      ) : (
        <NotFoundWord
          englishLevel={englishLevel}
          setEnglishLevel={setEnglishLevel}
          setPageNumber={setPageNumber}
          pageNumber={pageNumber}
          total={0}
          getNewWords={getNewWords}
        />
      )}
    </>
  );
};
