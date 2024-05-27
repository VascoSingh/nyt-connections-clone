import { Word } from "@/app/_types";
import ControlButton from "../button/control-button";
import GuessHistory from "../guess-history";
import GameModal from "./game-modal";
import { useState } from "react";

type GameWonModalProps = {
  isOpen: boolean;
  onClose: () => void;
  guessHistory: Word[][];
  perfection: string;
};

export default function GameWonModal(props: GameWonModalProps) {
  const [shareableText, setShareableText] = useState("");
  const [copiedMessage, setCopiedMessage] = useState("");

  const generateAndCopyShareableText = () => {
    let result = "ChatEDU Connections\n @Algorithms\n";
    for (const guess of props.guessHistory) {
      for (const word of guess) {
        switch (word.level) {
          case 1:
            result += "🟨";
            break;
          case 2:
            result += "🟩";
            break;
          case 3:
            result += "🟪";
            break;
          case 4:
            result += "🟦";
            break;
          default:
            result += "⬜";
        }
      }
      result += "\n";
    }
    result += "https://chatedu.io";
    setShareableText(result);

    navigator.clipboard.writeText(result).then(() => {
      setCopiedMessage("Copied results to clipboard!");
      setTimeout(() => setCopiedMessage(""), 2000); // Clear message after 2 seconds
    });
  };

  return (
    <GameModal isOpen={props.isOpen} onClose={props.onClose}>
      <div className="flex flex-col items-center justify-center px-12">
        <h1 className="text-black text-4xl font-black my-4 ml-4">
          {props.perfection}
        </h1>
        <hr className="mb-2 md:mb-4 w-full"></hr>
        <h2 className="text-black mb-8">{"You've won the game!"}</h2>
        <GuessHistory guessHistory={props.guessHistory} />
        <ControlButton text="Exit" onClick={props.onClose} />
        <ControlButton text="Share your results" onClick={generateAndCopyShareableText} />
        {copiedMessage && (
          <div className="mt-4">
            <p className="text-black mb-2">{copiedMessage}</p>
          </div>
        )}
      </div>
    </GameModal>
  );
}
