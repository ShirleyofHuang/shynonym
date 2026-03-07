import { useEffect, useRef, useState } from "react";
import { LetterBox } from "./LetterBox";

interface Props {
  // input: string,
  actualWord: string;
  letters: string[];
  maxLength: number;
  onChange: (letters: string[]) => void;
}

export const WordInput: React.FC<Props> = ({
  letters,
  actualWord,
  maxLength,
  onChange,
}) => {
  const [cursorPos, setCursorPos] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key.toUpperCase();

    if (key == "BACKSPACE") {
      const currentLetterPos = [...letters];
      currentLetterPos[cursorPos] = "";
      setCursorPos(cursorPos - 1 >= 0 ? cursorPos - 1 : 0);
      onChange?.(currentLetterPos);
      return;
    } else if (key.length === 1 && /[A-Z]/.test(key)) {
      console.log("got key down", key);
      const currentLetterPos = [...letters];
      currentLetterPos[cursorPos] = key;
      setCursorPos(cursorPos + 1 < maxLength ? cursorPos + 1 : cursorPos);
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
              setCursorPos(index);
            }}
            show={true}
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
