import React from 'react';
import { NavigationPage } from '../../components/navigationPage/NavigationPage';
import { Title } from '../../components/title/Title';
import './userWords.sass';

export const UserWords: React.FC = () => {
  return (
    <>
      <Title text="Словарь" />
      <NavigationPage classEl="userWords" path_1="difficultWords" path_2="learnedWords" />
    </>
  );
};
