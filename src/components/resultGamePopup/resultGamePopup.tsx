import { Button } from 'antd';
import audioImg from '../../assets/svg/audio.svg';
import { Answers } from '../../types/types';
import './resultGamePopup.sass';

export const ResultGamePopup: React.FC<{
  score: number;
  resultsAllAnswers: Answers;
  closePopUp: () => void;
}> = ({ score, resultsAllAnswers, closePopUp }) => {
  const soundWord = (path: string) => {
    const audioObj = new Audio(`${path}`);
    audioObj.play();
  };

  return (
    <div className="results hide-popup">
      <h3>Результаты</h3>
      <p>
        Вы набрали <span className="results-score">{score}</span> очков
      </p>
      <div className="results-answers">
        <strong className="results-answers_subtitle">Правильные ответы</strong>
        <div>
          {resultsAllAnswers.rightAnswer.map((answerData) => {
            return (
              <div className="results-answers_item" key={answerData.word}>
                <img
                  // onClick={() => {
                  //   voice(`${API.URL}${answerData.audio}`);
                  // }}
                  className="results-answers_icon"
                  src={audioImg}
                  alt="audio-icon"
                />
                <strong className="results-answers_word">{answerData.word}</strong>
              </div>
            );
          })}
        </div>
        <strong className="results-answers_subtitle">Не правильные ответы</strong>
        <div>
          {resultsAllAnswers.wrongAnswer.map((answerData) => {
            return (
              <div className="results-answers_item" key={answerData.word}>
                <img
                  // onClick={() => {
                  //   voice(`${API.URL}${answerData.audio}`);
                  // }}
                  className="results-answers_icon"
                  src={audioImg}
                  alt="audio-icon"
                />
                <strong className="results-answers_word">{answerData.word} </strong>
                {/* <span>&nbsp;- {answerData.translate}</span> */}
              </div>
            );
          })}
        </div>
      </div>
      <Button className="exit-results" onClick={closePopUp} type="primary">
        Закрыть
      </Button>
    </div>
  );
};
