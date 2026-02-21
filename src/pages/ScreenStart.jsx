import { useState } from "react";
import Styles from "../styles/s-pages/screenstart.module.scss";

const ScreenStart = ({ savedName, onStart }) => {
  const [name, setName] = useState(savedName || "");

  const handleStart = () => {
    if (!name.trim()) return;
    onStart(name.trim());
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.card}>
        <h1 className={Styles.title}>
          Интерактивный симулятор профессиональной коммуникации в сфере логистики
        </h1>

        <p className={Styles.subtitle}>
          Карагандинский университет Казпотребсоюза
        </p>

        <p className={Styles.author}>
          Лапина И.В.
        </p>

        <div className={Styles.inputBlock}>
          <label>Введите ваше имя:</label>
          <input
            onKeyDown={(e) => {
            if (e.key === "Enter") handleStart();
            }}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ваше имя"
          />
        </div>

        <button
          className={Styles.startBtn}
          onClick={handleStart}
          disabled={!name.trim()}
        >
          Начать
        </button>
      </div>
    </div>
  );
};

export default ScreenStart;
