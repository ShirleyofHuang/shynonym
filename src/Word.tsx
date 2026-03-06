import { useEffect, useState } from "react";
import dictionaryData from "./synonyms/synonyms.json"
import type { Dictionary, WordEntry } from "./types/types";
import { Definition } from "./components/Definition";
import { LetterBox } from "./components/LetterBox";

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
      <Definition word={currentWord} definition={entry.definition} />
      {isCorrect !== null && (
        <p style={{ color: isCorrect ? "green" : "red", fontWeight: "bold" }}>
          {isCorrect ? "You are right!" : "Wrong answer!"}
        </p>
      )}
      <p>The synonym has: {synonym.length} letters</p>
      <div className="d-flex gap-1 justify-content-center">
      {synonym.split("").map((letter, index) => (
        <LetterBox show={false} key={index} letter={letter} isActive={true} />
      ))}
      </div>
        {/* <input onChange={(e) => setUserInput(e.target.value)} value={userInput} /> */}
        <button onClick={checkAnswer} >Submit</button>

      <button onClick={handleNewWord}>
        New Random Word
      </button>
    </div>
  );
};

export default WordCard;