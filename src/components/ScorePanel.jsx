import Style from "../styles/s-components/scorepanel.module.scss";

const ScorePanel = ({ stats }) => {

  const config = {
    reputation: { label: "Reputation", icon: "⭐", max: 100 },
    satisfaction: { label: "Satisfaction", icon: "🤝", max: 100 },
    time: { label: "Time", icon: "⏳", max: 100 },
    impression: { label: "Impression", icon: "💬", max: 100 },
    clarity: { label: "Clarity", icon: "🧠", max: 100 },
    problemSolving: { label: "Problem Solving", icon: "⚙️", max: 100 }
  };

  const items = Object.keys(stats).map(key => ({
    key,
    ...(config[key] || {
      label: key,
      icon: "📊",
      max: 100
    })
  }));

  return (
    <div className={Style.panel}>
      {items.map(item => {
        const value = stats[item.key] ?? 0;
        const percent = Math.max(
          0,
          Math.min(100, (value / item.max) * 100)
        );

        return (
          <div key={item.key} className={Style.card}>
            <div className={Style.top}>
              <span className={Style.icon}>{item.icon}</span>
              <span className={Style.label}>{item.label}</span>
              <span className={Style.value}>{value}</span>
            </div>

            <div className={Style.bar}>
              <div
                className={Style.fill}
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ScorePanel;
