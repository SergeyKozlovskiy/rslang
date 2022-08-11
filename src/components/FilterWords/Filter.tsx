import { Pagination, Select } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { wordsSlice } from '../../store/asyncReducers/wordsBookSlice';
import { levels } from '../../utils/arrays';
const { Option } = Select;

export const Filter: React.FC<{
  total: number;
  getNewWords: (level: number | null, page: number | null) => void;
}> = ({ total, getNewWords }) => {
  const { EnglishLevel, pageBook } = useAppSelector((state) => state.wordsSlice);
  const dispatch = useAppDispatch();
  return (
    <div className="words-block__navigation">
      <label className="words-block__navigation-label" htmlFor="levelSelect">
        Уровень
        <Select
          id="levelSelect"
          value={EnglishLevel}
          onChange={(level) => {
            dispatch(wordsSlice.actions.setLevel(level));
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
          current={pageBook}
          onChange={(page) => {
            dispatch(wordsSlice.actions.setPage(page));
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
