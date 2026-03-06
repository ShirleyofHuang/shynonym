interface Props {
    letter: string, 
    show: boolean,
}

export const LetterBox: React.FC<Props>  = ({letter, show}) => {

  return (
    <div className="d-flex">
        {show ? <div>{letter}</div> : <div className="wf-2rem hf-2rem bg-secondary rounded-2"></div>}
      
    </div>
  );
};

