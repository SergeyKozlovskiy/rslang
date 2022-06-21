import AuthorizationForm from '../../components/authorizationForm/AuthorizationForm';
import AuthImg from '../../assets/authorization-registration/auth.jpg';
import './authorization.sass';

export const Authorization: React.FC = () => {
  return (
    <div className="auth-page">
      <div className="auth-page_form">
        <AuthorizationForm />
      </div>
      <img className="auth-page_img" src={AuthImg} alt="Клавиатура с английским флагом" />
    </div>
  );
};
