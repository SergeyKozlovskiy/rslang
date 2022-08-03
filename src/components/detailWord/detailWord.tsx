import { URLS } from '../../types/enums';
import { Word } from '../../types/types';
import dynamic from '../../assets/svg/audio.svg';
import { useState } from 'react';
import preloader from '../../assets/preloader/preloader.svg';
import { DetailWordButtons } from '../detailWordButtons/detailWordButtons';

export const DetailWord: React.FC<{
  detailWord: Word;
  handleClickButton: () => void;
  textButton: string;
  textLink: string;
  path: string;
}> = ({ detailWord, handleClickButton, textButton, textLink, path }) => {
  const [isLoadingImg, setIsLoadingImg] = useState<boolean>(true);

  const showImg = () => {
    setIsLoadingImg(false);
  };

  const voiceText = (path: string) => {
    const audio = new Audio(`${URLS.URL}/${path}`);
    if (audio.played) {
      audio.play();
    }
  };

  return (
    <div className="wrapper-word">
      <div className="words-info__title">
        {detailWord.word} <span>{detailWord.transcription}</span>
        <img
          className="speaker-btn"
          onClick={() => {
            voiceText(detailWord.audio);
          }}
          src={dynamic}
          alt="динамик"
        />
      </div>
      <div className="words-info__img">
        <img
          onLoad={showImg}
          src={`${URLS.URL}/${detailWord.image}`}
          alt="Изображение выбранного слова"
        />
        {isLoadingImg ? <img className="preloader" src={preloader} alt="Загрузка..."></img> : null}
      </div>
      <div className="words-info__wordTranslate">{detailWord.wordTranslate}</div>
      <div className="words-info__textExample">
        <img
          className="speaker-btn"
          onClick={() => {
            voiceText(detailWord.audioExample);
          }}
          src={dynamic}
          alt="динамик"
        />
        <div dangerouslySetInnerHTML={{ __html: detailWord.textExample }}></div>
      </div>

      <div className="words-info__textExampleTranslate">{detailWord.textExampleTranslate}</div>

      <div className="words-info__textMeaning">
        <img
          className="speaker-btn"
          onClick={() => {
            voiceText(detailWord.audioMeaning);
          }}
          src={dynamic}
          alt="динамик"
        />
        <div dangerouslySetInnerHTML={{ __html: detailWord.textMeaning }}></div>
      </div>

      <div
        className="words-info__textMeaningTranslate"
        dangerouslySetInnerHTML={{ __html: detailWord.textMeaningTranslate }}
      ></div>
      <DetailWordButtons
        handleClickButton={handleClickButton}
        textButton={textButton}
        textLink={textLink}
        path={path}
      />
    </div>
  );
};
