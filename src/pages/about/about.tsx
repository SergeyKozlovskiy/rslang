import React from 'react';
import './about.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Text } from '../../types/enums';
import { Classes } from '../../types/enums';
import DevPhoto from '../../assets/about/image.jpg';
import GitHubLogo from '../../assets/svg/github-logo.svg';

export const About: React.FC = () => (
  <main className={Classes.mainAboutPage} >
        {Text.aboutPageTitle} 
    <div className={Classes.aboutPageContainer}>
      <div className={Classes.aboutPageDevCard}><img src={DevPhoto} className={Classes.aboutPageDevCardImage} alt={Text.sergeyFullName}></img>
        <h2 className={Classes.aboutPageDevCardTitle}>{Text.sergeyFullName}</h2>
        <span className={Classes.aboutPageDevCardPosition}>Team Lead</span>{Text.sergeyTasksDescription}
        <a href='https://github.com/SergeyKozlovskiy' rel="noreferrer" target='_blank' className={Classes.aboutPageDevCardGitHub}><img src={GitHubLogo} alt='GitHub'></img></a>
      </div>
      <div className={Classes.aboutPageDevCard}>
        <img src={DevPhoto} className={Classes.aboutPageDevCardImage} alt={Text.pavelFullName}></img>
        <h2 className={Classes.aboutPageDevCardTitle}>{Text.pavelFullName}</h2>
        <span className={Classes.aboutPageDevCardPosition}>Lead Dev</span>{Text.pavelTasksDescription}
        <a href='https://github.com/VoitihovichP' rel="noreferrer" target='_blank' className={Classes.aboutPageDevCardGitHub}><img src={GitHubLogo} alt='GitHub'></img></a>
      </div>
      <div className={Classes.aboutPageDevCard}>
        <img className={Classes.aboutPageDevCardImage} src={DevPhoto} alt={Text.timurFullName}></img>
        <h2 className={Classes.aboutPageDevCardTitle}>{Text.timurFullName}</h2>
        <span className={Classes.aboutPageDevCardPosition}>Dev</span>{Text.timurTasksDescription}
        <a href='https://github.com/Stellarator85' rel="noreferrer" target='_blank' className={Classes.aboutPageDevCardGitHub}><img src={GitHubLogo} alt='GitHub'></img></a>
      </div>
    </div>
  </main>
 );