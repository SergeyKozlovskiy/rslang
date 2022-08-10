import { Pagination, Select } from 'antd';
import { levels } from '../../utils/arrays';
const { Option } = Select;

export const Filter: React.FC<{
  englishLevel: number;
  setEnglishLevel: (level: number) => void;
  setPageNumber: (page: number) => void;
  pageNumber: number;
  total: number;
  getNewWords: (level: number | null, page: number | null) => void;
}> = ({ englishLevel, setEnglishLevel, pageNumber, setPageNumber, total, getNewWords }) => {
  return (
    <div className="words-block__navigation">
      <label className="words-block__navigation-label" htmlFor="levelSelect">
        Уровень
        <Select
          id="levelSelect"
          value={englishLevel}
          onChange={(level) => {
            setEnglishLevel(level);
            getNewWords(level, null);
          }}
          style={{
            width: 170,
          }}
          defaultValue={0}
        >
          {levels.map((level, i) => {
            return (
              <Option key={level + i} value={i}>
                {level}
              </Option>
            );
          })}
        </Select>
      </label>

      <div className="words-block__navigation-label">
        Страница
        <Pagination
          current={pageNumber}
          onChange={(page) => {
            setPageNumber(page);
            getNewWords(null, page);
          }}
          defaultCurrent={0}
          total={total}
          pageSize={20}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};
