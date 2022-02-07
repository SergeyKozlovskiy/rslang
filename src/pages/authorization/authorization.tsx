import AuthorizationForm from "../../components/authorizationForm/AuthorizationForm";
import { RegistrationPopup } from "../../components/registrationPopup/RegistrationPopup";

export const Authorization: React.FC = () => {
  return (
    <div>
      <h2>Authorization</h2>
      <AuthorizationForm />
      <RegistrationPopup className='registration' text='Пользователь с таким email уже зарегестрирован'/>
      <RegistrationPopup className='login' text='Неверный email или пароль'/>
    </div>
  )
};