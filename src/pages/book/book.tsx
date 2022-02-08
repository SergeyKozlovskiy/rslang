import EnglishLevelButton from "../../components/englishLevelButton/EnglishLevelButton";
import './book.css'
import BookImg from '../../images/openBook.png';
import { Text, Classes, BookLevelColor, EnglishLevels } from "../../types/enums";

export const Book: React.FC = () => {
  return (
    <div className={Classes.book}>
      <div className={Classes.bookLevels}>
        <EnglishLevelButton 
          level={EnglishLevels.A1} 
          title={EnglishLevels.ELEMENTARY} 
          color={BookLevelColor.one} 
        />
        <EnglishLevelButton 
          level={EnglishLevels.A2} 
          title={EnglishLevels.PRE_INTERMEDIATE} 
          color={BookLevelColor.two} 
        />
        <EnglishLevelButton 
          level={EnglishLevels.B1} 
          title={EnglishLevels.INTERMEDIATE} 
          color={BookLevelColor.three} 
        />
        <EnglishLevelButton 
          level={EnglishLevels.B2} 
          title={EnglishLevels.UPPER_INTERMEDIATE} 
          color={BookLevelColor.four} 
        />
        <EnglishLevelButton 
          level={EnglishLevels.C1} 
          title={EnglishLevels.ADVANCED} 
          color={BookLevelColor.five} 
        />
        <EnglishLevelButton 
          level={EnglishLevels.C2} 
          title={EnglishLevels.PROFICIENCY} 
          color={BookLevelColor.six} 
        />
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