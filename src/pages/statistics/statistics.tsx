import React, { useEffect, useState } from 'react';
import { Doughnut, Pie } from 'react-chartjs-2';
import { useCookies } from 'react-cookie';
import { useAppDispatch } from '../../hooks/redux';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { getStatistics } from '../../store/asyncReducers/statisticsSlice';
import CountUp from 'react-countup';
import { ResponseStatistics } from '../../types/types';
import './Statistics.sass';
ChartJS.register(ArcElement, Tooltip, Legend);

const initialState = {
  id: '',
  learnedWords: 0,
  optional: {
    procCorrectAnswerAudioChallenge: 0,
    procCorrectAnswerSprint: 0,
    seriesCorrectAnswerAudioChallenge: 0,
    seriesCorrectAnswerSprint: 0,
    sumNewWordInDayAudioChallenge: 0,
    sumNewWordInDaySprint: 0,
  },
};

export const Statistics: React.FC = () => {
  const dispatch = useAppDispatch();
  const [statistics, setStatistics] = useState<ResponseStatistics>(initialState);
  const [cookies] = useCookies(['token', 'userId']);
  const [counter, setCounter] = useState(0);

  const options = {
    elements: {
      arc: {
        borderWidth: 1,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const sprintData = {
    labels: ['Верно', 'Не верно'],
    datasets: [
      {
        data: [
          statistics.optional.procCorrectAnswerSprint,
          100 - statistics.optional.procCorrectAnswerSprint,
        ],
        label: 'Спринт',
        backgroundColor: ['#0d6efd', '#bc202f'],
        hoverBackgroundColor: ['#0e2344', '#3f0b10'],
      },
    ],
  };

  const audioChallengeData = {
    labels: ['Верно', 'Не верно'],
    datasets: [
      {
        data: [
          statistics.optional.procCorrectAnswerAudioChallenge,
          100 - statistics.optional.procCorrectAnswerAudioChallenge,
        ],
        label: 'Аудиовызов',
        backgroundColor: ['#0d6efd', '#bc202f'],
        hoverBackgroundColor: ['#0e2344', '#3f0b10'],
      },
    ],
  };

  useEffect(() => {
    const getAllStatistics = async () => {
      if (cookies.token && cookies.userId) {
        const response = await dispatch(
          getStatistics({ token: cookies.token, userId: cookies.userId })
        );
        if (response.meta.requestStatus === 'fulfilled') {
          const responseStatistics = response.payload as ResponseStatistics;
          setStatistics(responseStatistics);
        }
      }
    };
    getAllStatistics();
  }, []);

  return (
    <div className="statistics">
      <div className="statistics-text">
        <div className="statistics-text__series">
          <div className="statistics-text__series-item">
            <h2 className="header-statistics">Максимальная серия верных ответов в игре Спринт</h2>
            <CountUp
              start={0}
              end={statistics.optional.seriesCorrectAnswerSprint}
              duration={2.75}
              useEasing={true}
            />
          </div>
          <div className="statistics-text__series-item">
            <h2 className="header-statistics">
              Максимальная серия верных ответов в игре Аудиовызов
            </h2>
            <CountUp
              start={0}
              end={statistics.optional.seriesCorrectAnswerAudioChallenge}
              duration={2.75}
              useEasing={true}
            />
          </div>
        </div>
        <div className="statistics-text__series">
          <div className="statistics-text__series-item">
            <h2 className="header-statistics">Колличество пройденных слов в игре Спринт за день</h2>
            <CountUp
              start={0}
              end={statistics.optional.sumNewWordInDaySprint}
              duration={2.75}
              useEasing={true}
            />
          </div>
          <div className="statistics-text__series-item">
            <h2 className="header-statistics">
              Колличество пройденных слов в игре Аудиовызов за день
            </h2>
            <CountUp
              start={0}
              end={statistics.optional.sumNewWordInDayAudioChallenge}
              duration={2.75}
              useEasing={true}
            />
          </div>
        </div>
      </div>
      <div className="statistics-pie">
        <h2>Соотношение верных ответов в мини-играх</h2>
        <h3>Спринт</h3>
        <Doughnut data={sprintData} options={options} />
        <h3>Аудиовызов</h3>
        <Doughnut data={audioChallengeData} options={options} />
      </div>
    </div>
  );
};
