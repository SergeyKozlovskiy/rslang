import { Filter } from '../FilterWords/Filter';

export const NotFoundWord: React.FC<{
  total: number;
  getNewWords: (level: number | null, page: number | null) => void;
}> = ({ total, getNewWords }) => {
  return (
    <div className="notFoundBlock">
      <Filter total={total} getNewWords={getNewWords} />
      <h2>Извините ничего не найдено...</h2>
    </div>
  );
};
