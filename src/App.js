import { useState } from "react";
import DialogueEngine from "./components/DialogueEngine";
import TopicsMenu from "./pages/TopicsMenu";
import { situation1 } from "./data/situation1";
import { situation2 } from "./data/situation2";
import { situation3 } from "./data/situation3";
import { situation4 } from "./data/situation4";
import { situation5 } from "./data/situation5";
import { situation6 } from "./data/situation6";
import { situation7 } from "./data/situation7";
import { situation8 } from "./data/situation8";
import { situation9 } from "./data/situation9";
import { situation10 } from "./data/situation10";
import { situation11 } from "./data/situation11";
import { situation12 } from "./data/situation12";
import { situation13 } from "./data/situation13";
import { situation14 } from "./data/situation14";

const topics = [
  situation1,
  situation2, 
  situation3, 
  situation4, 
  situation5, 
  situation6, 
  situation7,
  situation8,
  situation9,
  situation10,
  situation11,
  situation12,
  situation13,
  situation14
];

function App() {
  const [selectedTopic, setSelectedTopic] = useState(null);

  return (
    <>
      {!selectedTopic ? (
        <TopicsMenu topics={topics} onSelect={setSelectedTopic} />
      ) : (
        <DialogueEngine data={selectedTopic} onExit={() => setSelectedTopic(null)} />
      )}
    </>
  );
}

export default App;
