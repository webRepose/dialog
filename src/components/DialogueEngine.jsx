import { useState, useEffect, useRef } from "react";
import SceneRenderer from "./SceneRenderer";
import ScorePanel from "./ScorePanel";
import Style from "../styles/s-components/dialogue.module.scss";

const DialogueEngine = ({ data }) => {
  const [currentNode, setCurrentNode] = useState("intro");
  const [stats, setStats] = useState(() => ({ ...data.initialState }));
  const [chatHistory, setChatHistory] = useState([]);

  const bottomRef = useRef(null);
  const node = data.nodes[currentNode];

  // 🔁 reset при смене сценария
  useEffect(() => {
    setCurrentNode("intro");
    setStats({ ...data.initialState });
    setChatHistory([]);
  }, [data]);

  // 📩 добавление сообщений узла
  useEffect(() => {
    if (!node || !node.messages) return;

    setChatHistory(prev => {
      const newMessages = node.messages.map(msg => ({
        ...msg,
        type: "npc"
      }));

      return [...prev, ...newMessages];
    });
  }, [currentNode, node]);

  // ⬇ автоскролл
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  // 🎯 применение эффектов
  const applyEffects = (effects) => {
    setStats(prev => {
      const updated = { ...prev };

      Object.keys(effects).forEach(key => {
        updated[key] = (updated[key] || 0) + effects[key];

        // ограничение 0–100
        if (updated[key] > 100) updated[key] = 100;
        if (updated[key] < 0) updated[key] = 0;
      });

      return updated;
    });
  };

  const handleChoice = (option) => {
    setChatHistory(prev => [
      ...prev,
      { speaker: "You", text: option.text, type: "user" }
    ]);

    if (option.effects) {
      applyEffects(option.effects);
    }

    setCurrentNode(option.next);
  };

  return (
    <div className={Style.wrapper}>

      <div className={Style.header}>
        <div className={Style.missionTitle}>
          {data.title}
        </div>
        <ScorePanel stats={stats} />
      </div>

      <SceneRenderer
        node={node}
        onChoice={handleChoice}
        stats={stats}
        chatHistory={chatHistory}
        bottomRef={bottomRef}
        scoring={data.scoring}
      />

    </div>
  );
};

export default DialogueEngine;

