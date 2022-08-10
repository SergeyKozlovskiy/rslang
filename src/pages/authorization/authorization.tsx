import AuthImg from '../../assets/authorization/auth.jpg';
import { Form } from '../../components/Authorization/Form';
import './Authorization.sass';

export const Authorization: React.FC = () => {
  return (
    <div className="auth-page">
      <div className="auth-page_form">
        <Form />
      </div>
      <img className="auth-page_img" src={AuthImg} alt="Клавиатура с английским флагом" />
    </div>
  );
};
