import { Button } from 'antd';
import { useState } from 'react';
import audioImg from '../../assets/svg/audio.svg';
import muteImg from '../../assets/svg/mute.svg';
import './questionCardSprint.sass';

export const QuestionCardSprint: React.FC<{
  indicator: boolean | undefined;
  score: number;
  word: string;
  translate: string;
  responseCheck: (answer: boolean) => void;
}> = ({ score, word, translate, responseCheck, indicator }) => {
  const [mute, setMute] = useState(false);

  const changeMute = () => {
    setMute(!mute);
  };

  return (
    <div className="wrapper-question-card">
      <div className="question-card hide-popup">
        <div className="question-card__settings">
          <div className="question-card__indicator">
            <div
              className={
                indicator === undefined
                  ? 'question-card__indicators-item'
                  : indicator
                  ? 'question-card__indicators-item right-answer'
                  : 'question-card__indicators-item wrong-answer'
              }
            ></div>
          </div>
          <img
            onClick={changeMute}
            className="results-answers_icon"
            src={mute ? muteImg : audioImg}
            alt="audio-icon"
          />
        </div>

        <p className="question-card__score">
          Очки: <span>{score}</span>
        </p>
        <p className="question-card__word">{word}</p>
        <p className="question-card__translate">{translate}</p>
        <Button
          className="question-card_btn"
          onClick={() => {
            responseCheck(false);
          }}
          type="primary"
          danger
        >
          Не верно
        </Button>
        <Button
          className="question-card_btn"
          onClick={() => {
            responseCheck(true);
          }}
          type="primary"
        >
          Верно
        </Button>
      </div>
    </div>
  );
};
