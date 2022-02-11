import EnglishLevelButton from "../../components/englishLevelButton/EnglishLevelButton";
import './book.css'
import BookImg from '../../images/openBook.png';
import { Text, Classes, BookLevelColor, EnglishLevels } from "../../types/enums";
import { Link } from 'react-router-dom';

export const Book: React.FC = () => {
  return (
    <div className={Classes.book}>
      <div className={Classes.bookLevels}>
        <Link to="/WordsPage">
          <EnglishLevelButton 
            level={EnglishLevels.A2} 
            title={EnglishLevels.PRE_INTERMEDIATE} 
            color={BookLevelColor.two} 
            group={1}
            page={0}
          />
        </Link>
        <Link to="/WordsPage">
          <EnglishLevelButton 
            level={EnglishLevels.B1} 
            title={EnglishLevels.INTERMEDIATE} 
            color={BookLevelColor.three} 
            group={2}
            page={0}
          />
        </Link>
        <Link to ="/WordsPage">
          <EnglishLevelButton 
            level={EnglishLevels.B2} 
            title={EnglishLevels.UPPER_INTERMEDIATE} 
            color={BookLevelColor.four} 
            group={3}
            page={0}
          />
        </Link>
        <Link to ="/WordsPage">
          <EnglishLevelButton 
            level={EnglishLevels.C1} 
            title={EnglishLevels.ADVANCED} 
            color={BookLevelColor.five} 
            group={4}
            page={0}
          />
        </Link>
        <Link to ="/WordsPage">
          <EnglishLevelButton 
            level={EnglishLevels.C2} 
            title={EnglishLevels.PROFICIENCY} 
            color={BookLevelColor.six} 
            group={5}
            page={0}
          />
        </Link>
      </div>
      <div className={Classes.bookText}>
        <img src={BookImg} alt="book-icon" className={Classes.bookImage} />
        <p className={Classes.bookDescr}>
          {Text.bookDescrPartOne} <span>{Text.bookDescrSpan}</span> {Text.bookDescrPartTwo}
        </p>
      </div>
    </div>
  );
};