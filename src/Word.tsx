import { useEffect, useState } from "react";
import dictionaryData from "./synonyms/synonyms.json"
import type { Dictionary, WordEntry } from "./types/types";

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
  const [userInput, setUserInput] = useState('')
  const [synonym, setSynonym] = useState<string>('')
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  const entry = dictionary[currentWord];

  useEffect(() => {
    if (entry) {
        setSynonym(getRandomSynonym(entry))
        setIsCorrect(null)
    }   
  }, [entry])

  const handleNewWord = () => {
    setCurrentWord(getRandomWord());
  };

  const checkAnswer = () => {
    if (userInput == synonym) {
        setIsCorrect(true)
    } else {
        setIsCorrect(false)
    }
  }

  return (
    <div className="d-flex flex-column">
      <h2>{currentWord}</h2>
      <p>{entry.definition}</p>
      {isCorrect !== null && (
        <p style={{ color: isCorrect ? "green" : "red", fontWeight: "bold" }}>
          {isCorrect ? "You are right!" : "Wrong answer!"}
        </p>
      )}
      <p>The synonym has: {synonym.length} letters</p>

        <input onChange={(e) => setUserInput(e.target.value)} value={userInput} />
        <button onClick={checkAnswer} >Submit</button>

      <button onClick={handleNewWord}>
        New Random Word
      </button>
    </div>
  );
};

export default WordCard;