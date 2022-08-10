import React, { useCallback, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Main } from './pages/Main/Main';
import { Authorization } from './pages/Authorization/Authorization';
import { Book } from './pages/Book/Book';
import { Games } from './pages/Games/Games';
import { Statistics } from './pages/Statistics/Statistics';
import { Sprint } from './pages/Games/sprint/Sprint';
import { AudioChallenge } from './pages/Games/AudioChallenge/AudioChallenge';
import { AboutProject } from './pages/AboutProject/AboutProject';
import { UserWords } from './pages/UserWords/UserWords';
import { useCookies } from 'react-cookie';
import { useAppDispatch } from './hooks/redux';
import { authSlice, getNewToken } from './store/asyncReducers/authSlice';
import { WordsPage } from './pages/Book/WordsPage/WordsPage';
import { DifficultWords } from './pages/UserWords/DifficultWords/DifficultWords';
import { LearnedWords } from './pages/UserWords/LearnedWords/LearnedWords';
import { decodeToken } from 'react-jwt';
import { DecodeToken } from './types/types';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import './App.sass';
import { Menu } from './components/Menu/Menu';
import { Page404 } from './pages/404/Page404';

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
            <Route path="about" element={<AboutProject />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
