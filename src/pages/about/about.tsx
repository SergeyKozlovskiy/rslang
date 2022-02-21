import React from 'react';
import './about.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Text } from '../../types/enums';
import { Classes } from '../../types/enums';
import SergeyPhoto from '../../assets/about/Sergey-avatar.png';
import PavelPhoto from '../../assets/about/Pavel-avatar.png';
import TimurPhoto from '../../assets/about/Timur-avatar.png';

export const About: React.FC = () => (
  <main className={Classes.mainAboutPage} >
        {Text.aboutPageTitle} 
    <div className={Classes.aboutPageContainer}>
      <div className={Classes.aboutPageDevCard}><img src={SergeyPhoto} className={Classes.aboutPageDevCardImage} alt={Text.sergeyFullName}></img>
        <h2 className={Classes.aboutPageDevCardTitle}>{Text.sergeyFullName}</h2>
        <span className={Classes.aboutPageDevCardPosition}>Team Lead</span>{Text.sergeyTasksDescription}
        <a className={Classes.aboutPageDevCardGitHub} href='https://github.com/SergeyKozlovskiy' target='_blank' rel='noreferrer'>GitHub-ID: SergeyKozlovskiy</a>
      </div>
      <div className={Classes.aboutPageDevCard}>
        <img src={PavelPhoto} className={Classes.aboutPageDevCardImage} alt={Text.pavelFullName}></img>
        <h2 className={Classes.aboutPageDevCardTitle}>{Text.pavelFullName}</h2>
        <span className={Classes.aboutPageDevCardPosition}>Lead Dev</span>{Text.pavelTasksDescription}
        <a className={Classes.aboutPageDevCardGitHub} href='https://github.com/VoitihovichP' target='_blank' rel='noreferrer'>GitHub-ID: VoitihovichP</a>
      </div>
      <div className={Classes.aboutPageDevCard}>
        <img className={Classes.aboutPageDevCardImage} src={TimurPhoto} alt={Text.timurFullName}></img>
        <h2 className={Classes.aboutPageDevCardTitle}>{Text.timurFullName}</h2>
        <span className={Classes.aboutPageDevCardPosition}>Dev</span>{Text.timurTasksDescription}
        <a className={Classes.aboutPageDevCardGitHub} href='https://github.com/Stellarator85' target='_blank' rel='noreferrer'>GitHub-ID: Stellarator85</a>
      </div>
    </div>
  </main>
 );