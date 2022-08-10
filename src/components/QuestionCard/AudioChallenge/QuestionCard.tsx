import { useEffect, useState } from 'react';
import dynamic from '../../../assets/game-page/speak.png';
import { audioPlay } from '../../../services/audioPlay';
import { URLS } from '../../../types/enums';
import { Word } from '../../../types/types';
import './QuestionCard.sass';

export const QuestionCard: React.FC<{
  answers: Word[];
  gameWord: Word[];
  numQuestion: number;
  nextQuestion: () => void;
  writeDownWrongAnswer: (word: Word) => void;
  responseСheck: (id: string) => void;
}> = ({ numQuestion, gameWord, responseСheck, answers, nextQuestion, writeDownWrongAnswer }) => {
  const [isShowCurrentAnswer, setIsShowCurrentAnswer] = useState(false);

  const showCurrentAnswer = () => {
    setIsShowCurrentAnswer(!isShowCurrentAnswer);
    if (isShowCurrentAnswer) {
      writeDownWrongAnswer(gameWord[numQuestion]);
      nextQuestion();
    }
  };

  useEffect(() => {
    audioPlay(`${URLS.URL}/${gameWord[numQuestion].audio}`);
  }, [gameWord, numQuestion]);

  return (
    <div className="audioChallenge-question">
      <div className="audioChallenge-question__numQuestion">{numQuestion + 1} / 20</div>
      <img
        onClick={() => audioPlay(`${URLS.URL}/${gameWord[numQuestion].audio}`)}
        className="audioChallenge-question__img"
        src={isShowCurrentAnswer ? `${URLS.URL}/${gameWord[numQuestion].image}` : dynamic}
        alt="Динамик"
      />
      <div className="audioChallenge-question__answers">
        {answers.map((elem) => {
          return (
            <button
              key={elem.id}
              onClick={() => responseСheck(elem.id)}
              className={
                isShowCurrentAnswer && elem.id === gameWord[numQuestion].id
                  ? 'audioChallenge-question__answers-item current-answer'
                  : 'audioChallenge-question__answers-item'
              }
              disabled={isShowCurrentAnswer ? true : false}
            >
              {elem.wordTranslate}
            </button>
          );
        })}
      </div>
      <button className="audioChallenge-question__button" onClick={showCurrentAnswer}>
        {isShowCurrentAnswer ? 'Продолжить' : 'Не знаю'}
      </button>
    </div>
  );
};
