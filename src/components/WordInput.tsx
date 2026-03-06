import { useEffect, useRef, useState } from "react";
import { LetterBox } from "./LetterBox";

interface Props {
    // input: string,
    maxLength: number,
    onChange: () => void,
}

export const WordInput: React.FC<Props>  = ({ maxLength, onChange}) => {
    const [letters, setLetters] = useState<string[]>(Array(maxLength).fill(""));
    const [cursorPos, setCursorPos] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const key = e.key.toUpperCase()

        if (key == 'BACKSPACE') {
            const newLetters = [...letters];
            newLetters[cursorPos] = ""
            const pos = cursorPos > 0 ? cursorPos - 1 : 0;
            setLetters(newLetters);
            setCursorPos(pos);
            return;
        }

        if (key.length === 1 && /[A-Z]/.test(key)) {
            // fill next box
            const newLetters = [...letters];
            newLetters[cursorPos] = key;
            setLetters(newLetters);
            setCursorPos(cursorPos + 1 < maxLength ? cursorPos + 1 : cursorPos);
        }
    }

  return (
    <div className="d-flex flex-column">
        <div className="d-flex gap-1 justify-content-center">
        {Array.from({ length: maxLength }, (_, index) => (
            <LetterBox
                onClick={() => {
                    inputRef.current?.focus()
                    setCursorPos(index)
                }}
                show={false}
                key={index}
                letter={letters[index]}          // letter may be "" if not typed yet
                isActive={index === cursorPos}   // next box for cursor
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

