import { Link } from 'react-router-dom';

export const NavigationPage: React.FC<{ classEl: string; path_1: string; path_2: string }> = ({
  classEl,
  path_1,
  path_2,
}) => {
  return (
    <ul className={classEl}>
      <li className={`${classEl}-item`}>
        <Link className={`${classEl}-item__link`} to={path_1}></Link>
      </li>
      <li className={`${classEl}-item`}>
        <Link className={`${classEl}-item__link`} to={path_2}></Link>
      </li>
    </ul>
  );
};
