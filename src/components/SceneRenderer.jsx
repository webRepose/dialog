import Style from "../styles/s-components/scenerender.module.scss";

  const SceneRenderer = ({
  node,
  onChoice,
  onRestart,
  onBackToMenu,
  stats,
  chatHistory,
  bottomRef,
  scoring
}) => {

  if (!node) return null;

  // =========================
  // CHAT NODE
  // =========================

  if (node.type === "chat") {
    return (
      <div className={Style.chat_container}>

        {chatHistory.map((msg, i) => (
          <div
            key={i}
            className={`${Style.message_row} ${
              msg.speaker === "You"
                ? Style.user_row
                : Style.npc_row
            }`}
          >
            <div className={Style.avatar}>
              {msg.speaker === "You" ? "🧑" : "💼"}
            </div>

            <div
              className={`${Style.bubble} ${
                msg.type === "document" ? Style.document : ""
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {node.options && (
          <div className={Style.choice_container}>
            {node.options.map((opt, i) => (
              <div
                key={i}
                className={Style.choice_card}
                onClick={() => onChoice(opt)}
              >
                <div className={Style.choice_preview}>
                  {opt.text}
                </div>
                <div className={Style.choice_hint}>
                  Нажмите, чтобы выбрать
                </div>
              </div>
            ))}
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    );
  }

  // =========================
  // FINAL FEEDBACK
  // =========================

  if (node.type === "final-feedback") {

  const scoringKeys =
    scoring && scoring.length
      ? scoring
      : Object.keys(stats);

  const values = scoringKeys
    .map(key => Number(stats[key]))
    .filter(val => !isNaN(val));

  const total = values.reduce((sum, val) => sum + val, 0);

  const average =
    values.length > 0
      ? total / values.length
      : 0;

  const excellent = node.thresholds?.excellent ?? 75;
  const good = node.thresholds?.good ?? 55;

  let message = "";

  if (average >= excellent) {
    message = node.feedback?.excellent ?? "Excellent performance!";
  } else if (average >= good) {
    message = node.feedback?.good ?? "Good effort.";
  } else {
    message = node.feedback?.poor ?? "Needs improvement.";
  }

  return (
    <div className={Style.final_screen}>
      <h2>Финальный отзыв</h2>
      <p>{message}</p>

      <div className={Style.score}>
        Кол-во баллов: {Math.round(average)}
      </div>

      <div className={Style.final_actions}>
        <button
          className={`${Style.action_btn} ${Style.restart}`}
          onClick={onRestart}
        >
          🔁 Повторить
        </button>

        <button
          className={`${Style.action_btn} ${Style.menu}`}
          onClick={onBackToMenu}
        >
          🏠 Вернуться в меню
        </button>
      </div>
    </div>
  );
}

  return null;
};

export default SceneRenderer;
