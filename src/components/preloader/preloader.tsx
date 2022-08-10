import preloader from '../../assets/preloader/preloader.svg';

export const Preloader: React.FC = () => {
  return <img className="preloader" src={preloader} alt="Загрузка..."></img>;
};
