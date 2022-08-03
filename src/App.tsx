import React, { useCallback, useEffect } from 'react';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Route, Routes } from 'react-router-dom';
import { Main } from './pages/main/main';
import { Authorization } from './pages/authorization/authorization';
import { Book } from './pages/book/book';
import { Games } from './pages/games/games';
import { Statistics } from './pages/statistics/statistics';
import { Sprint } from './pages/games/sprint/sprint';
import { AudioChallenge } from './pages/games/audioChallenge/audioChallenge';
import { About } from './pages/about/about';
import { UserWords } from './pages/userWords/userWords';
import { Menu } from './components/menu/menu';
import { useCookies } from 'react-cookie';
import { useAppDispatch } from './hooks/redux';
import { authSlice, getNewToken } from './store/asyncReducers/authSlice';
import { WordsPage } from './pages/book/wordsPage/WordsPage';
import { DifficultWords } from './pages/userWords/difficultWords/difficultWords';
import { LearnedWords } from './pages/userWords/learnedWords/learnedWords';
import { decodeToken } from 'react-jwt';
import { DecodeToken } from './types/types';
import './App.sass';

function App() {
  const [cookie] = useCookies(['name', 'token', 'refreshToken']);
  const dispatch = useAppDispatch();

  const authCheck = useCallback(async () => {
    if ((cookie.token, cookie.name)) {
      dispatch(authSlice.actions.setIsLogin(true));
      dispatch(authSlice.actions.setName(cookie.name));
    } else if (!cookie.token && cookie.refreshToken) {
      const token = decodeToken(cookie.refreshToken) as DecodeToken;
      dispatch(getNewToken({ userId: token.id, refreshToken: cookie.refreshToken }));
    } else {
      dispatch(authSlice.actions.setIsLogin(false));
    }
  }, [cookie.name, cookie.refreshToken, cookie.token, dispatch]);

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  return (
    <div className="app">
      <Header />
      <div className="app__wrapper">
        <Menu />
        <div className="app__wrapper-page">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="authorization" element={<Authorization />} />
            <Route path="book" element={<Book />} />
            <Route path="book/words" element={<WordsPage />} />
            <Route path="userWords" element={<UserWords />} />
            <Route path="userWords/difficultWords" element={<DifficultWords />} />
            <Route path="userWords/learnedWords" element={<LearnedWords />} />
            <Route path="games" element={<Games />} />
            <Route path="statistics" element={<Statistics />} />
            <Route path="sprint" element={<Sprint />} />
            <Route path="audioChallenge" element={<AudioChallenge />} />
            <Route path="about" element={<About />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
