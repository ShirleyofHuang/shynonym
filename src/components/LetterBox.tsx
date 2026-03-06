interface Props {
    letter: string, 
    show: boolean,
    isActive: boolean,
    onClick? : () => void,
}

export const LetterBox: React.FC<Props>  = ({letter, show, isActive, onClick}) => {

  return (
    <div className="d-flex" onClick={onClick}>
        {show ? <div>{letter}</div> : <div className={`wf-5 hf-5 bg-secondary rounded-2 opacity-25 ${
    isActive ? "border border-3 border-black" : ""
  }`}>
    <h1 className="text-black fw-bolder opacity-100">{letter}</h1>
  </div>}
      
    </div>
  );
};

