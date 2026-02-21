import Style from "../styles/s-components/resultscreen.module.scss";

const ResultScreen = ({ stats }) => {
  const total = stats.reputation + stats.impression;

  const getMessage = () => {
    if (total >= 60)
      return "Отличная работа! Ваше резюме и письмо производят сильное впечатление.";
    if (total >= 40)
      return "Хорошая попытка. Стоит сделать описание навыков более конкретным.";
    return "Результат слабый. Необходимо более профессионально представить опыт.";
  };

  return (
    <div className={Style.wrapper}>
      <h2 className={Style.title}>Обратная связь от работодателя</h2>

      <div className={Style.score}>
        Общий балл: <span>{total}</span>
      </div>

      <p className={Style.message}>{getMessage()}</p>
    </div>
  );
};

export default ResultScreen;
