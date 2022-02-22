import React, {useState, useEffect} from 'react';
import './statistics.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table'
import Sonnet from 'react-bootstrap/Tabs';
import { Text } from '../../types/enums';
import { Classes } from '../../types/enums';
import { useSelector, useDispatch } from 'react-redux';
import { IReduxState, IStatistic, StatisticsLocalStateType } from '../../types/types';
import { getStatistic } from '../../requests/getStatistic';

export const Statistics: React.FC = () => {

  const state: IReduxState = useSelector((state: IReduxState) => state);
  const dispatch = useDispatch();
  const [Statistics, setStatistics] = useState<StatisticsLocalStateType>({
    isStatisticLoaded: false,
    statistic: null
  });

  useEffect(() => {
    if(state.IsLogin === true) {
      getStatistic(dispatch).then((data: IStatistic | null) => {
        setStatistics({
          isStatisticLoaded: true,
          statistic: data
        })
      })
    }
  }, []);

  const getStatisticPerssent = () => {
    if(Statistics.statistic?.optional.audioChalange && Statistics.statistic?.optional.sprint) {
      return `${(Statistics.statistic?.optional.audioChalange?.persent + Statistics.statistic?.optional.sprint.persent) / 2}${Text.persent}`
    }
    if(Statistics.statistic?.optional.audioChalange) {
      return `${Statistics.statistic?.optional.audioChalange.persent}${Text.persent}`
    }
    if(Statistics.statistic?.optional.sprint) {
      return `${Statistics.statistic.optional.sprint.persent}${Text.persent}`
    }
  }

  const getStatisticWins = () => {
    if(Statistics.statistic?.optional.audioChalange && Statistics.statistic?.optional.sprint) {
      if(Statistics.statistic?.optional.audioChalange?.wins > Statistics.statistic?.optional.sprint.wins) {
        return Statistics.statistic?.optional.audioChalange?.wins;
      } else {
        return Statistics.statistic?.optional.sprint?.wins
      }
    }
    if(Statistics.statistic?.optional.audioChalange) {
      return `${Statistics.statistic?.optional.audioChalange.wins}`
    }
    if(Statistics.statistic?.optional.sprint) {
      return `${Statistics.statistic.optional.sprint.wins}`
    }
  }

  return (
    state.IsLogin === true
    ?
      Statistics.isStatisticLoaded === true
      ?
      <main className={ Classes.mainStatisticsPage }>
        <h2 className={Classes.mainStatisticsPageTitle}>{Text.mainStatisticsPageTitle}</h2> 
        <Tabs defaultActiveKey={Text.mainStatisticsPageTabOneName} className={Classes.mainStatisticsPageTabs}>
          <Tab eventKey={Text.mainStatisticsPageTabOneName} title={Text.mainStatisticsPageTabOneTitle}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>{Text.mainStatisticsPageTableHeadCellOneContent}</th>
                    <th>{Text.mainStatisticsPageTableHeadCellTwoContent}</th>
                    <th>{Text.mainStatisticsPageTableHeadCellFourContent}</th>
                    <th>{Text.mainStatisticsPageTableHeadCellFiveContent}</th>
                    <th>{Text.mainStatisticsPageTableHeadCellSixContent}</th>
                  </tr>
                </thead>
                <tbody>
                    <tr>
                      <td>{Text.mainStatisticsPageTableRowOneCellOneContent}</td>
                      <td>{state.userInfo.name}</td>
                      <td>
                        {
                          Statistics.statistic !== null
                          ?
                            Statistics.statistic.learnedWords
                          :
                          Text.mainStatisticsPageTableRowOneCellThreeContent
                        }
                      </td>
                      <td>
                        {
                          Statistics.statistic !== null
                          ?
                          getStatisticPerssent()
                          :
                          Text.mainStatisticsPageTableRowOneCellFiveContent
                        }
                      </td>
                      <td>
                        {
                          Statistics.statistic !== null
                          ?
                          getStatisticWins()
                          :
                          Text.mainStatisticsPageTableRowOneCellSixContent
                        }
                      </td>
                    </tr>
                  </tbody>
                </Table>
              <Sonnet />
          </Tab>
            <Tab eventKey={Text.mainStatisticsPageTabTwoName} title={Text.mainStatisticsPageTabTwoTitle}>
            <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>{Text.mainStatisticsPageTableHeadCellOneContent}</th>
                    <th>{Text.mainStatisticsPageTableHeadCellTwoContent}</th>
                    <th>{Text.mainStatisticsPageTableHeadCellFourContent}</th>
                    <th>{Text.mainStatisticsPageTableHeadCellFiveContent}</th>
                    <th>{Text.mainStatisticsPageTableHeadCellSixContent}</th>
                  </tr>
                </thead>
                <tbody>
                    <tr>
                      <td>{Text.mainStatisticsPageTableRowOneCellOneContent}</td>
                      <td>{state.userInfo.name}</td>
                      <td>
                        {
                          Statistics.statistic !== null
                          ?
                            Statistics.statistic.optional.sprint
                            ?
                            Statistics.statistic.optional.sprint.corectAnswers
                            :
                            Text.mainStatisticsPageTableRowOneCellFourContent
                          :
                          Text.mainStatisticsPageTableRowOneCellFourContent
                        }
                      </td>
                      <td>
                        {
                          Statistics.statistic !== null
                          ?
                            Statistics.statistic.optional.sprint
                            ?
                            `${Statistics.statistic.optional.sprint.persent}${Text.persent}`
                            :
                            Text.mainStatisticsPageTableRowOneCellFiveContent
                          :
                          Text.mainStatisticsPageTableRowOneCellFiveContent
                        }
                      </td>
                      <td>
                        {
                          Statistics.statistic !== null
                          ?
                            Statistics.statistic.optional.sprint
                            ?
                            Statistics.statistic.optional.sprint.wins
                            :
                            Text.mainStatisticsPageTableRowOneCellSixContent
                          :
                          Text.mainStatisticsPageTableRowOneCellSixContent
                        }
                      </td>
                    </tr>
                  </tbody>
                </Table>
            <Sonnet />
          </Tab>
            <Tab eventKey={Text.mainStatisticsPageTabThreeName} title={Text.mainStatisticsPageTabThreeTitle}>
            <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>{Text.mainStatisticsPageTableHeadCellOneContent}</th>
                    <th>{Text.mainStatisticsPageTableHeadCellTwoContent}</th>
                    <th>{Text.mainStatisticsPageTableHeadCellFourContent}</th>
                    <th>{Text.mainStatisticsPageTableHeadCellFiveContent}</th>
                    <th>{Text.mainStatisticsPageTableHeadCellSixContent}</th>
                  </tr>
                </thead>
                <tbody>
                    <tr>
                      <td>{Text.mainStatisticsPageTableRowOneCellOneContent}</td>
                      <td>{state.userInfo.name}</td>
                      <td>
                        {
                          Statistics.statistic !== null
                          ?
                            Statistics.statistic.optional.audioChalange
                            ?
                            Statistics.statistic.optional.audioChalange.corectAnswers
                            :
                            Text.mainStatisticsPageTableRowOneCellFourContent
                          :
                          Text.mainStatisticsPageTableRowOneCellFourContent
                        }
                      </td>
                      <td>
                        {
                          Statistics.statistic !== null
                          ?
                            Statistics.statistic.optional.audioChalange
                            ?
                            `${Statistics.statistic.optional.audioChalange.persent}${Text.persent}`
                            :
                            Text.mainStatisticsPageTableRowOneCellFiveContent
                          :
                          Text.mainStatisticsPageTableRowOneCellFiveContent
                        }
                      </td>
                      <td>
                        {
                          Statistics.statistic !== null
                          ?
                            Statistics.statistic.optional.audioChalange
                            ?
                            Statistics.statistic.optional.audioChalange.wins
                            :
                            Text.mainStatisticsPageTableRowOneCellSixContent
                          :
                          Text.mainStatisticsPageTableRowOneCellSixContent
                        }
                      </td>
                    </tr>
                  </tbody>
                </Table>
            <Sonnet />
          </Tab>
        </Tabs>
      </main>
      :
    <h2>{Text.loadStatistic}</h2>
    :
    <h1>{Text.statisticLogInWarning}</h1>
  )
};