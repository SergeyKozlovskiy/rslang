import { useNavigate } from 'react-router';
import bookImg from '../../assets/book/reading.png';
import preloader from '../../assets/preloader/preloader.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getWords } from '../../store/asyncReducers/wordsBookSlice';
import { EnglishLevels } from '../../types/enums';
import './book.sass';

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
          <li className="book-levels__list-li">
            <button
              onClick={() => {
                handleClickLevel(0);
              }}
              className="book-levels__list-li_link"
            >
              <span>{EnglishLevels.A1}</span> {EnglishLevels.ELEMENTARY}
            </button>
          </li>
          <li className="book-levels__list-li">
            <button
              onClick={() => {
                handleClickLevel(1);
              }}
              className="book-levels__list-li_link"
            >
              <span>{EnglishLevels.A2}</span> {EnglishLevels.PRE_INTERMEDIATE}
            </button>
          </li>
          <li className="book-levels__list-li">
            <button
              onClick={() => {
                handleClickLevel(2);
              }}
              className="book-levels__list-li_link"
            >
              <span>{EnglishLevels.B1}</span> {EnglishLevels.INTERMEDIATE}
            </button>
          </li>
          <li className="book-levels__list-li">
            <button
              onClick={() => {
                handleClickLevel(3);
              }}
              className="book-levels__list-li_link"
            >
              <span>{EnglishLevels.B2}</span> {EnglishLevels.UPPER_INTERMEDIATE}
            </button>
          </li>
          <li className="book-levels__list-li">
            <button
              onClick={() => {
                handleClickLevel(4);
              }}
              className="book-levels__list-li_link"
            >
              <span>{EnglishLevels.C1}</span> {EnglishLevels.ADVANCED}
            </button>
          </li>
          <li className="book-levels__list-li">
            <button
              onClick={() => {
                handleClickLevel(5);
              }}
              className="book-levels__list-li_link"
            >
              <span>{EnglishLevels.C2}</span> {EnglishLevels.PROFICIENCY}
            </button>
          </li>
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
