import { useEffect, useRef, useState } from "react";
import { LetterBox } from "./LetterBox";

interface Props {
  // input: string,
  actualWord: string;
  letters: string[];
  maxLength: number;
  onChange: (letters: string[]) => void;
  givenIndex: Record<number, string>;
}

export const WordInput: React.FC<Props> = ({
  letters,
  actualWord,
  maxLength,
  onChange,
  givenIndex,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const firstEmpty = letters.findIndex(
    (letter, i) => letter === "" && !givenIndex[i],
  );
  const cursorPos = firstEmpty === -1 ? letters.length - 1 : firstEmpty;

  const lastFilledIndex = () => {
    for (let i = letters.length - 1; i >= 0; i--) {
      if (letters[i] !== "" && !givenIndex[i]) return i;
    }
    return 0; // fallback
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key.toUpperCase();

    if (key == "BACKSPACE") {
      const currentLetterPos = [...letters];
      currentLetterPos[lastFilledIndex()] = "";
      onChange?.(currentLetterPos);
      return;
    } else if (key.length === 1 && /[A-Z]/.test(key)) {
      const currentLetterPos = [...letters];
      currentLetterPos[cursorPos] = key;
      onChange?.(currentLetterPos);
      return;
    } else {
      return;
    }
  };

  return (
    <div className="d-flex flex-column">
      <div className="d-flex gap-1 justify-content-center">
        {Array.from({ length: maxLength }, (_, index) => (
          <LetterBox
            onClick={() => {
              inputRef.current?.focus();
            }}
            show={!!givenIndex[index]}
            key={index}
            correctLetter={actualWord.charAt(index)}
            letter={letters[index]}
            isActive={index === cursorPos}
          />
        ))}
      </div>
      <input
        ref={inputRef}
        style={{ opacity: 0, position: "absolute", pointerEvents: "none" }}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};
