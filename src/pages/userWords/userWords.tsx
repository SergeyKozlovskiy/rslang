import React from 'react';
import { NavigationPage } from '../../components/NavigationPage/NavigationPage';
import { Title } from '../../components/Title/Title';
import './UserWords.sass';

export const UserWords: React.FC = () => {
  return (
    <>
      <Title text="Словарь" />
      <NavigationPage classEl="userWords" path_1="difficultWords" path_2="learnedWords" />
    </>
  );
};
