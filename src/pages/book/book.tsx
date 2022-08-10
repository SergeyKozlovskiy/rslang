import { useNavigate } from 'react-router';
import bookImg from '../../assets/book/reading.png';
import preloader from '../../assets/preloader/preloader.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getWords } from '../../store/asyncReducers/wordsBookSlice';
import { designations, levels } from '../../utils/arrays';
import './Book.sass';

export const Book: React.FC = () => {
  const { isLoading } = useAppSelector((state) => state.wordsSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleClickLevel = async (group: number) => {
    const result = await dispatch(getWords({ group: group, page: 6 }));
    if (result.meta.requestStatus === 'fulfilled') {
      navigate('words');
    }
  };

  return (
    <div className="book">
      <div className="book-levels">
        <ul className="book-levels__list">
          {levels.map((level, i) => {
            return (
              <li key={level + i} className="book-levels__list-li">
                <button onClick={() => handleClickLevel(i)} className="book-levels__list-li_link">
                  <span>{designations[i]}</span> {level}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="book-info">
        <img className="book-info__img" src={bookImg} alt="мальчик читает книгу" />
        <p className="book-info__text">
          Электронный учебник предназначен для тех, кому удобнее изучать слова стандартными
          методами. Тут ты можешь посмотреть на написание слова, послушать как звучит его
          произношение и увидеть примеры употребления этого слова в предложении. Слово показалось
          тебе сложным? Не беда, пометь его как <span>СЛОЖНОЕ СЛОВО</span> и вернись к нему позже!
          Слова идут по возрастанию сложности. Выбирай и учи, Удачи!
        </p>
      </div>
      {isLoading ? <img className="preloader" src={preloader} alt="Загрузка..."></img> : null}
    </div>
  );
};
