import React from 'react';
import './footer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Text } from '../../types/enums';
import { Classes } from '../../types/enums'

export const Footer: React.FC = () => {
  return <footer className = {Classes.footer}>
    <a href="https://rs.school/" rel="noreferrer" target='_blank'><div className = {Classes.footerRsSchool}>
      {Text.footerRsSchool}</div></a>
    <div className={Classes.footerLogo}>{Text.footerLogo}<br></br><span className={Classes.footerLogoSpan}>{Text.footerYearMark}</span></div>
    <ul className = {Classes.footerGithubLinks}>  
      <a href='https://github.com/SergeyKozlovskiy' rel="noreferrer" target='_blank'><li className = {Classes.footerGithubLinksItem}>{Text.footerGithubLinksItem1}</li></a>
      <a href='https://github.com/VoitihovichP' rel="noreferrer" target='_blank'><li className = {Classes.footerGithubLinksItem}>{Text.footerGithubLinksItem2}</li></a>
      <a href='https://github.com/Stellarator85' rel="noreferrer" target='_blank'><li className={Classes.footerGithubLinksItem}>{Text.footerGithubLinksItem3}</li></a> 
    </ul>
  </footer>
};