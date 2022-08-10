import { Word } from '../../types/types';

export const Words: React.FC<{ words: Word[]; showDetailWord: (word: Word) => void }> = ({
  words,
  showDetailWord,
}) => {
  return (
    <div className="words-block__items">
      {words.map((word) => {
        return (
          <div
            key={word.word}
            onClick={() => {
              showDetailWord(word);
            }}
            className="words-block__items-item"
          >
            {word.word}
          </div>
        );
      })}
    </div>
  );
};
