import React from 'react';
import './statistics.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table'
import Sonnet from 'react-bootstrap/Tabs';
import { Text } from '../../types/enums';
import { Classes } from '../../types/enums';

export const Statistics: React.FC = () => (
  <main className={ Classes.mainStatisticsPage }>
    <h2 className={Classes.mainStatisticsPageTitle}>{Text.mainStatisticsPageTitle}</h2> 
  <Tabs defaultActiveKey={Text.mainStatisticsPageTabOneName} className={Classes.mainStatisticsPageTabs}>
    <Tab eventKey={Text.mainStatisticsPageTabOneName} title={Text.mainStatisticsPageTabOneTitle}>
        <Table striped bordered hover>
           <thead>
            <tr>
              <th>{Text.mainStatisticsPageTableHeadCellOneContent}</th>
              <th>{Text.mainStatisticsPageTableHeadCellTwoContent}</th>
              <th>{Text.mainStatisticsPageTableHeadCellThreeContent}</th>
              <th>{Text.mainStatisticsPageTableHeadCellFourContent}</th>
              <th>{Text.mainStatisticsPageTableHeadCellFiveContent}</th>
              <th>{Text.mainStatisticsPageTableHeadCellSixContent}</th>
            </tr>
           </thead>
           <tbody>
              <tr>
                <td>{Text.mainStatisticsPageTableRowOneCellOneContent}</td>
                <td>{Text.mainStatisticsPageTableRowOneCellTwoContent}</td>
                <td>{Text.mainStatisticsPageTableRowOneCellThreeContent}</td>
                <td>{Text.mainStatisticsPageTableRowOneCellFourContent}</td>
                <td>{Text.mainStatisticsPageTableRowOneCellFiveContent}</td>
                <td>{Text.mainStatisticsPageTableRowOneCellSixContent}</td>
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
              <th>{Text.mainStatisticsPageTableHeadCellThreeContent}</th>
              <th>{Text.mainStatisticsPageTableHeadCellFourContent}</th>
              <th>{Text.mainStatisticsPageTableHeadCellFiveContent}</th>
              <th>{Text.mainStatisticsPageTableHeadCellSixContent}</th>
            </tr>
           </thead>
           <tbody>
              <tr>
                <td>{Text.mainStatisticsPageTableRowOneCellOneContent}</td>
                <td>{Text.mainStatisticsPageTableRowOneCellTwoContent}</td>
                <td>{Text.mainStatisticsPageTableRowOneCellThreeContent}</td>
                <td>{Text.mainStatisticsPageTableRowOneCellFourContent}</td>
                <td>{Text.mainStatisticsPageTableRowOneCellFiveContent}</td>
                <td>{Text.mainStatisticsPageTableRowOneCellSixContent}</td>
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
              <th>{Text.mainStatisticsPageTableHeadCellThreeContent}</th>
              <th>{Text.mainStatisticsPageTableHeadCellFourContent}</th>
              <th>{Text.mainStatisticsPageTableHeadCellFiveContent}</th>
              <th>{Text.mainStatisticsPageTableHeadCellSixContent}</th>
            </tr>
           </thead>
           <tbody>
              <tr>
                <td>{Text.mainStatisticsPageTableRowOneCellOneContent}</td>
                <td>{Text.mainStatisticsPageTableRowOneCellTwoContent}</td>
                <td>{Text.mainStatisticsPageTableRowOneCellThreeContent}</td>
                <td>{Text.mainStatisticsPageTableRowOneCellFourContent}</td>
                <td>{Text.mainStatisticsPageTableRowOneCellFiveContent}</td>
                <td>{Text.mainStatisticsPageTableRowOneCellSixContent}</td>
              </tr>
             </tbody>
           </Table>
      <Sonnet />
    </Tab>
  </Tabs>
  </main>
);