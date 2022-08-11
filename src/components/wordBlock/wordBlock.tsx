import Button from 'antd/lib/button';
import { Word } from '../../types/types';
import { DetailWord } from '../DetailWord/DetailWord';
import { Filter } from '../FilterWords/Filter';
import { Words } from '../Words/Words';
import './WordBlock.sass';

export const WordBlock: React.FC<{
  searchCount: number;
  words: Word[];
  showDetailWord: (word: Word) => void;
  detailWord: Word | undefined;
  handleClickButton: () => void;
  textButton: string;
  textLink: string;
  path: string;
  getNewWords: (level: number | null, page: number | null) => void;
  startGame?: () => void;
}> = ({
  searchCount,
  words,
  showDetailWord,
  detailWord,
  handleClickButton,
  textButton,
  textLink,
  path,
  getNewWords,
  startGame,
}) => {
  return (
    <div className="wordBlock">
      <div className="words">
        <div className="words-block">
          <Filter total={searchCount} getNewWords={getNewWords} />
          <Words words={words} showDetailWord={showDetailWord} />
          {startGame ? (
            <Button onClick={startGame} className="startGame" type="primary">
              Играть !
            </Button>
          ) : null}
        </div>
        <div className="words-info">
          {detailWord ? (
            <DetailWord
              detailWord={detailWord}
              handleClickButton={handleClickButton}
              textButton={textButton}
              textLink={textLink}
              path={path}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};
