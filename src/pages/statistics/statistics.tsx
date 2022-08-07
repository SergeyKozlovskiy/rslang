import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useAppDispatch } from '../../hooks/redux';
import { getStatistics } from '../../store/asyncReducers/statisticsSlice';
import './statistics.css';

export const Statistics: React.FC = () => {
  const dispatch = useAppDispatch();
  const [cookies] = useCookies(['token', 'userId']);
  useEffect(() => {
    const getAllStatistics = async () => {
      if (cookies.token && cookies.userId) {
        const response = await dispatch(
          getStatistics({ token: cookies.token, userId: cookies.userId })
        );
      }
    };
    getAllStatistics();
  }, []);

  return <div className="statistic"></div>;
};
