import { useEffect, useState } from "react";
import dictionaryData from "./synonyms/synonyms.json"
import type { Dictionary, WordEntry } from "./types/types";
import { Definition } from "./components/Definition";
import { LetterBox } from "./components/LetterBox";
import { WordInput } from "./components/WordInput";

const dictionary = dictionaryData as Dictionary;
const words = Object.keys(dictionary);

const getRandomWord = (): string => {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
};

const getRandomSynonym = (word: WordEntry): string => {
    const randomIndex = Math.floor(Math.random() * word.related.length)
    return word.related[randomIndex]
}

const WordCard = () => {
  const [currentWord, setCurrentWord] = useState<string>(getRandomWord());
  const [synonym, setSynonym] = useState<string>('')
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [curInput, setCurInput] = useState<string>('')

  const entry = dictionary[currentWord];

  useEffect(() => {
    if (currentWord) {
        setSynonym(getRandomSynonym(dictionary[currentWord]))
        setIsCorrect(null)
    }   
  }, [currentWord])

  const handleNewWord = () => {
    setCurrentWord(getRandomWord());
  };


  return (
    <div className="d-flex flex-column">
      <Definition word={currentWord} definition={entry.definition} />
      {isCorrect !== null && (
        <p style={{ color: isCorrect ? "green" : "red", fontWeight: "bold" }}>
          {isCorrect ? "You are right!" : "Wrong answer!"}
        </p>
      )}
      <p>The synonym has: {synonym.length} letters</p>
        <WordInput maxLength={synonym.length} onChange={} />
        <button className="mt-5" disabled={}> Submit</button>

      <button onClick={handleNewWord}>
        New Random Word
      </button>
    </div>
  );
};

export default WordCard;