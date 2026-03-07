import { useEffect, useRef } from "react";
import { LetterBox } from "./LetterBox";

interface Props {
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

  const cursorPos = (() => {
    const firstEmpty = letters.findIndex(
      (letter, i) => letter === "" && !givenIndex[i],
    );
    console.log(firstEmpty, letters, "first empty");
    return firstEmpty === -1 ? letters.length - 1 : firstEmpty;
  })();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key.toUpperCase();
    const currentLetters = [...letters]; // copy of latest state

    // recompute cursor on each keypress
    const firstEmpty = currentLetters.findIndex(
      (l, i) => l === "" && !givenIndex[i],
    );
    const cursorPos =
      firstEmpty === -1 ? currentLetters.length - 1 : firstEmpty;

    // find last filled index for backspace
    const lastFilled = (() => {
      for (let i = currentLetters.length - 1; i >= 0; i--) {
        if (currentLetters[i] !== "" && !givenIndex[i]) return i;
      }
      return 0;
    })();

    if (key === "BACKSPACE") {
      currentLetters[lastFilled] = "";
      onChange?.(currentLetters);
      return;
    }

    if (key.length === 1 && /[A-Z]/.test(key)) {
      currentLetters[cursorPos] = key;
      onChange?.(currentLetters);
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
