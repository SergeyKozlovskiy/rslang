import { Filter } from '../FilterWords/Filter';

export const NotFoundWord: React.FC<{
  englishLevel: number;
  setEnglishLevel: (level: number) => void;
  setPageNumber: (page: number) => void;
  pageNumber: number;
  total: number;
  getNewWords: (level: number | null, page: number | null) => void;
}> = ({ englishLevel, setEnglishLevel, pageNumber, setPageNumber, total, getNewWords }) => {
  return (
    <div className="notFoundBlock">
      <Filter
        englishLevel={englishLevel}
        setEnglishLevel={setEnglishLevel}
        setPageNumber={setPageNumber}
        pageNumber={pageNumber}
        total={total}
        getNewWords={getNewWords}
      />
      <h2>Извините ничего не найдено...</h2>
    </div>
  );
};
