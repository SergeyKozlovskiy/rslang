import React from 'react';
import './App.css';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Route, Routes } from 'react-router-dom';
import { Main } from './pages/main/main';
import { Authorization } from './pages/authorization/authorization';
import { Book } from './pages/book/book';
import { Games } from './pages/games/games';
import { Statistics } from './pages/statistics/statistics';
import { Sprint } from './pages/games/sprint/sprint';
import { AudioCall } from './pages/games/audioCall/audioCall';
import { About } from './pages/about/about';
import { WordsPage } from './pages/book/wordsPage/WordsPage'

function App() {
  return (
    <div className="app-wrapper">
      <Header/>
      <div className="wrapper-page">
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/authorization' element={<Authorization/>}/>
          <Route path='/book' element={<Book/>}/>
          <Route path='/WordsPage' element={<WordsPage/>}/>
          <Route path='/games' element={<Games/>}/>
          <Route path='/statistics' element={<Statistics/>}/>
          <Route path='/sprint' element={<Sprint/>}/>
          <Route path='/audioCall' element={<AudioCall />} />
          <Route path='/about' element={<About/>}/>
        </Routes>
      </div>
      <Footer/>
    </div>

  );
}

export default App;
