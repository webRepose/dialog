import Style from "../styles/s-pages/topicmenu.module.scss";

const TopicsMenu = ({ topics, onSelect }) => {
  return (
    <div className={Style.wrapper}>
      <h1 className={Style.title}>Выберите UNIT</h1>

      <div className={Style.grid}>
        {topics.map(topic => (
          <div
            key={topic.id}
            className={Style.card}
            onClick={() => onSelect(topic)}
          >
            <div className={Style.cardTitle}>{topic.title}</div>
            <div className={Style.cardHint}>Начать Unit →</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicsMenu;