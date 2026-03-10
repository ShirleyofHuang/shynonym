interface Props {
  correctLetter: string;
  letter: string;
  show: boolean;
  isActive: boolean;
  onClick?: () => void;
}

export const LetterBox: React.FC<Props> = ({
  letter,
  correctLetter,
  show,
  isActive,
  onClick,
}) => {
  return (
    <div className="d-flex" onClick={onClick}>
      <div
        className={`wf-5 hf-5 text-center ${show ? "" : "bg-custom"} rounded-2 ${
          isActive ? "border border-3 border-black" : ""
        }`}
      >
        <h1 className="text-black fw-bolder opacity-100">
          {show ? correctLetter.toUpperCase() : letter}
        </h1>
      </div>
    </div>
  );
};
