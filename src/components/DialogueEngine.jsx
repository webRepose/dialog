import { useState, useEffect, useRef, useCallback } from "react";
import SceneRenderer from "./SceneRenderer";
import ScorePanel from "./ScorePanel";
import Style from "../styles/s-components/dialogue.module.scss";

const DialogueEngine = ({ data, playerName, onExit }) => {
  const [currentNode, setCurrentNode] = useState("intro");
  const [stats, setStats] = useState(() => ({ ...data.initialState }));
  const [chatHistory, setChatHistory] = useState([]);

  const bottomRef = useRef(null);
  const node = data.nodes[currentNode];

  const restartScenario = () => {
    setCurrentNode("intro");
    setStats({ ...data.initialState });
    setChatHistory([]);
  };

  const replacePlayerName = useCallback(
    (text) => {
      if (!text) return "";
      const name = playerName?.trim() || "Player";
      return text
        .replace(/\[ *Player *Name *\]/gi, name)
        .replace(/\[ *Your *Name *\]/gi, name)
        .replace(/\[ *Student *Name *\]/gi, name)
        .replace(/\{playerName\}/gi, name);
    },
    [playerName]
  );
  // 📩 Добавление сообщений узла
  useEffect(() => {
    if (!node || !node.messages) return;

    setChatHistory((prev) => {
      const newMessages = node.messages.map((msg) => ({
        ...msg,
        type: "npc",
        text: replacePlayerName(msg.text),
      }));
      return [...prev, ...newMessages];
    });
  }, [currentNode, node, replacePlayerName]);

  // 🔹 Автоскролл
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  // 🎯 Применение эффектов
  const applyEffects = (effects) => {
    setStats((prev) => {
      const updated = { ...prev };
      Object.keys(effects).forEach((key) => {
        updated[key] = (updated[key] || 0) + effects[key];
        if (updated[key] > 100) updated[key] = 100;
        if (updated[key] < 0) updated[key] = 0;
      });
      return updated;
    });
  };

      const handleChoice = (option) => {
      setChatHistory((prev) => [
        ...prev,
        { speaker: "You", text: option.text, type: "user" }, // option.text уже с именем
      ]);

      if (option.effects) {
        applyEffects(option.effects);
      }

      setCurrentNode(option.next);
    };

  return (
    <div className={Style.wrapper}>
      <div className={Style.header}>
        <div className={Style.missionTitle}>{data.title}</div>
        <ScorePanel stats={stats} />
      </div>
      <SceneRenderer
        node={{
            ...node,
            options: node.options?.map(opt => ({
              ...opt,
              text: replacePlayerName(opt.text)
            }))
          }}
        onChoice={(option) => {
          const replacedOption = {
            ...option,
            text: replacePlayerName(option.text)
          };
          handleChoice(replacedOption);
        }}
        onRestart={restartScenario}
        onBackToMenu={onExit}
        stats={stats}
        chatHistory={chatHistory}
        bottomRef={bottomRef}
        scoring={data.scoring}
      />
    </div>
  );
};

export default DialogueEngine;