import { useEffect, useState } from "react";
import dictionaryData from "./synonyms/synonyms.json";
import type { Dictionary, WordEntry } from "./types/types";
import { Definition } from "./components/Definition";
import { WordInput } from "./components/WordInput";
import { useTemporaryState } from "./hooks/useTemporaryState";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

const dictionary = dictionaryData as Dictionary;
const words = Object.keys(dictionary);

const getRandomWord = (): string => {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
};

const getRandomSynonym = (word: WordEntry): string => {
  const randomIndex = Math.floor(Math.random() * word.related.length);
  return word.related[randomIndex];
};

const WordCard = () => {
  const [currentWord] = useState(() => getRandomWord());
  const [synonym] = useState(() => getRandomSynonym(dictionary[currentWord]));
  // const [synonym, setSynonym] = useState<string>("");
  const [isCorrect, setIsCorrect] = useTemporaryState<boolean | null>(
    null,
    3000,
  );
  // const [showFirework, setShowFirework] = useTemporaryState<boolean | null>(null, 3000);
  const [curInput, setCurInput] = useState<string[]>(
    new Array(synonym.length).fill(""),
  );
  const [hints, setHints] = useState<Record<number, string>>({});

  const entry = dictionary[currentWord];

  const verifyWord = () => {
    if (curInput.join("").toLowerCase() === synonym) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
      setCurInput(new Array(synonym.length).fill(""));
      setTimeout(() => {
        setIsCorrect(null);
      }, 3000); // 3 seconds
      let randomIndex = Math.floor(Math.random() * synonym.length);
      while (hints[randomIndex]) {
        randomIndex = Math.floor(Math.random() * synonym.length);
      }
      // Update hints
      setHints((prev) => ({
        ...prev, // copy existing hints
        [randomIndex]: synonym.charAt(randomIndex), // reveal new letter
      }));

      // Also update curInput at the same index
      //  setHints((prev) => (prev[randomIndex] = synonym.charAt(randomIndex)));
    }
  };

  useEffect(() => {
    setCurInput((prev) => {
      const next = [...prev];
      Object.keys(hints).forEach((key) => {
        next[Number(key)] = hints[Number(key)];
      });
      return next;
    });
  }, [hints]);

  return (
    <div className="d-flex flex-column">
      <Definition word={currentWord} definition={entry.definition} />
      {isCorrect !== null && (
        <p style={{ color: isCorrect ? "green" : "red", fontWeight: "bold" }}>
          {isCorrect ? <Fireworks autorun={{ speed: 3 }} /> : "Wrong answer!"}
        </p>
      )}
      <p>The synonym has: {synonym.length} letters</p>
      <WordInput
        maxLength={synonym.length}
        letters={curInput}
        onChange={(word) => setCurInput(word)}
        actualWord={synonym}
        givenIndex={hints}
      />
      <button
        onClick={verifyWord}
        className="mt-5"
        disabled={curInput.some((item) => item === "")}
      >
        {" "}
        Submit
      </button>

      {/* <button onClick={handleNewWord}>New Random Word</button> */}
    </div>
  );
};

export default WordCard;
