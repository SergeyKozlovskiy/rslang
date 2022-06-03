import React from 'react';
import './dictionaryBtn.css';

export const DictionaryBtn: React.FC<{
  text: string;
  styleText: string;
  func: (difficulty: string) => void;
  difficulty: string;
}> = (props: {
  text: string;
  styleText: string;
  func: (difficulty: string) => void;
  difficulty: string;
}) => {
  const goToWords = props.func;

  return (
    <button
      onClick={() => goToWords(props.difficulty)}
      className={`dictionary-menu-btn style_${props.styleText}`}
    >
      {props.text}
    </button>
  );
};
