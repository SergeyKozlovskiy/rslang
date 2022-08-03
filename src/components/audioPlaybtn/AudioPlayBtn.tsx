import React from 'react';
import { MagicNumbers } from '../../types/enums';
import './audioPlayBtn.css';
import { AudioBtnPropsType } from '../../types/types';

export const AudioPlayBtn: React.FC<AudioBtnPropsType> = (props: AudioBtnPropsType) => {
  const audioPathArray: Array<string> = [
    // `${API.URL}${props.audioUrl}`,
    // `${API.URL}${props.audioMeaningUrl}`,
    // `${API.URL}${props.audioExempleUrl}`,
  ];

  const startAudio = (num: number): void => {
    let currAudio: number = num;
    const audio: HTMLAudioElement = new Audio(audioPathArray[currAudio]);
    audio.play();
    currAudio += MagicNumbers.STEP;
    if (currAudio < audioPathArray.length) {
      audio.onended = () => {
        startAudio(currAudio);
      };
    }
  };

  return (
    <button onClick={() => startAudio(MagicNumbers.ZER0_VALUE)} className="play-audio-btn"></button>
  );
};
