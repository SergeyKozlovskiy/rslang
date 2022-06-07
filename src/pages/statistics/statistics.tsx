import React, { useState, useEffect } from 'react';
import './statistics.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table';
import Sonnet from 'react-bootstrap/Tabs';
import { Text } from '../../types/enums';
import { Classes } from '../../types/enums';
import { useSelector, useDispatch } from 'react-redux';
import { IReduxState, IStatistic, StatisticsLocalStateType } from '../../types/types';

export const Statistics: React.FC = () => {
  const state: IReduxState = useSelector((state: IReduxState) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    // if(state.IsLogin === true) {
    //   getStatistic(dispatch).then((data: IStatistic | null) => {
    //     setStatistics({
    //       isStatisticLoaded: true,
    //       statistic: data
    //     })
    //   })
    // }
  }, []);

  const getStatisticPerssent = () => {
    // if (Statistics.statistic?.optional.audioChalange && Statistics.statistic?.optional.sprint) {
    //   return `${
    //     (Statistics.statistic?.optional.audioChalange?.persent +
    //       Statistics.statistic?.optional.sprint.persent) /
    //     2
    //   }${Text.persent}`;
    // }
    // if (Statistics.statistic?.optional.audioChalange) {
    //   return `${Statistics.statistic?.optional.audioChalange.persent}${Text.persent}`;
    // }
    // if (Statistics.statistic?.optional.sprint) {
    //   return `${Statistics.statistic.optional.sprint.persent}${Text.persent}`;
    // }
  };

  const getStatisticWins = () => {
    // if (Statistics.statistic?.optional.audioChalange && Statistics.statistic?.optional.sprint) {
    //   if (
    //     Statistics.statistic?.optional.audioChalange?.wins >
    //     Statistics.statistic?.optional.sprint.wins
    //   ) {
    //     return Statistics.statistic?.optional.audioChalange?.wins;
    //   } else {
    //     return Statistics.statistic?.optional.sprint?.wins;
    //   }
    // }
    // if (Statistics.statistic?.optional.audioChalange) {
    //   return `${Statistics.statistic?.optional.audioChalange.wins}`;
    // }
    // if (Statistics.statistic?.optional.sprint) {
    //   return `${Statistics.statistic.optional.sprint.wins}`;
    // }
  };

  return <div className="statistic"></div>;
};
