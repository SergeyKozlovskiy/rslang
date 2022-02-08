import EnglishLevelButton from "../../components/englishLevelButton/EnglishLevelButton";
import './book.css'

export const Book: React.FC = () => {
  return (
    <div className="electronic-book">
      <div className="electronic-levels">
        <EnglishLevelButton level="A1" title="Elementary" />
        <EnglishLevelButton level="A2" title="Pre-Intermediate" />
        <EnglishLevelButton level="B1" title="Intermediate" />
        <EnglishLevelButton level="B2" title="Upper-Intermediate" />
        <EnglishLevelButton level="C1" title="Advanced" />
        <EnglishLevelButton level="C2" title="Proficiency" />
      </div>
    </div>
  );
};