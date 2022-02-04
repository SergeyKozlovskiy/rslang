import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Text } from '../../types/enums';
import { Classes } from '../../types/enums'

export const Footer: React.FC = () => {
  return <footer className = {Classes.footer}>
    <a href="https://rs.school/" rel="noreferrer" target='_blank'><div className = {Classes.footerRsSchool}>
      {Text.footerRsSchool}</div></a>
    RS•Lang© <br></br>
    2022г.
    <ul className = {Classes.footerGithubLinks}>
      <a href='https://github.com/SergeyKozlovskiy' rel="noreferrer" target='_blank'><li className = {Classes.footerGithubLinksItem}>{Text.footerGithubLinksItem1}</li></a>
      <a href='https://github.com/VoitihovichP' rel="noreferrer" target='_blank'><li className = {Classes.footerGithubLinksItem}>{Text.footerGithubLinksItem2}</li></a>
      <a href='https://github.com/Stellarator85' rel="noreferrer" target='_blank'><li className = {Classes.footerGithubLinksItem}>{Text.footerGithubLinksItem3}</li></a> 
    </ul>
  </footer>
};

/*
<a class="footer_rs-shool" target="_blank" href="https://rs.school/"
        >Javascript/Front-end 2021Q3
        <img src="assets/svg/rs_school_js.svg" alt="Rolling Scopes School"
      /></a>
      ©&nbsp;2021
      <a class="footer_rs-shool" target="_blank" href="https://rs.school/"
        >Javascript/Front-end 2021Q3
        <img src="assets/svg/rs_school_js.svg" alt="Rolling Scopes School"
      /></a>

      */