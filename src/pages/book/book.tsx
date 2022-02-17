import EnglishLevelButton from "../../components/englishLevelButton/EnglishLevelButton";
import './book.css'
import BookImg from '../../images/openBook.png';
import { Text, Classes, BookLevelColor, EnglishLevels, MagicNumbers } from "../../types/enums";
import { useSelector } from "react-redux";
import { IReduxState } from "../../types/types";
import { WordsPage } from "./wordsPage/WordsPage";

export const Book: React.FC = () => {

  const state: IReduxState = useSelector((state: IReduxState) => state);
  
  return (
    !state.isWordsLoad
    ?
    <div className={Classes.book}>
      <div className={Classes.bookLevels}>
          <EnglishLevelButton 
            level={EnglishLevels.A1} 
            title={EnglishLevels.ELEMENTARY} 
            color={BookLevelColor.one} 
            group={MagicNumbers.ZER0_VALUE}
            page={MagicNumbers.ZER0_VALUE}
          />
          <EnglishLevelButton 
            level={EnglishLevels.A2} 
            title={EnglishLevels.PRE_INTERMEDIATE} 
            color={BookLevelColor.two} 
            group={1}
            page={MagicNumbers.ZER0_VALUE}
          />
          <EnglishLevelButton 
            level={EnglishLevels.B1} 
            title={EnglishLevels.INTERMEDIATE} 
            color={BookLevelColor.three} 
            group={2}
            page={MagicNumbers.ZER0_VALUE}
          />
          <EnglishLevelButton 
            level={EnglishLevels.B2} 
            title={EnglishLevels.UPPER_INTERMEDIATE} 
            color={BookLevelColor.four} 
            group={3}
            page={MagicNumbers.ZER0_VALUE}
          />
          <EnglishLevelButton 
            level={EnglishLevels.C1} 
            title={EnglishLevels.ADVANCED} 
            color={BookLevelColor.five} 
            group={4}
            page={MagicNumbers.ZER0_VALUE}
          />
          <EnglishLevelButton 
            level={EnglishLevels.C2} 
            title={EnglishLevels.PROFICIENCY} 
            color={BookLevelColor.six} 
            group={5}
            page={MagicNumbers.ZER0_VALUE}
          />
      </div>
      <div className={Classes.bookText}>
        <img src={BookImg} alt="book-icon" className={Classes.bookImage} />
        <p className={Classes.bookDescr}>
          {Text.bookDescrPartOne} <span>{Text.bookDescrSpan}</span> {Text.bookDescrPartTwo}
        </p>
      </div>
    </div>
    : 
    <WordsPage />
   );
};