import AuthorizationForm from "../../components/authorizationForm/AuthorizationForm";
import { RegistrationPopup } from "../../components/registrationPopup/RegistrationPopup";
import './authorization.css'

export const Authorization: React.FC = () => {
  return (
    <div className="main_auth-page">
      <h2>Авторизация</h2>
      <AuthorizationForm />
      <RegistrationPopup className='registration' text='Пользователь с таким email уже зарегестрирован'/>
      <RegistrationPopup className='login' text='Неверный email или пароль'/>
    </div>
  )
};