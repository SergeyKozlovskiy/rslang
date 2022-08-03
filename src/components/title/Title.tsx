import './title.sass';
export const Title: React.FC<{ text: string }> = ({ text }) => {
  return <h2 className="title">{text}</h2>;
};
