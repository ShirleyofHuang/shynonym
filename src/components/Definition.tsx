interface Props {
  word: string;
  definition: string;
}

export const Definition: React.FC<Props> = ({ word, definition }) => {
  return (
    <div className="d-flex flex-column">
      <h1>{word}</h1>
      <p>{definition}</p>
    </div>
  );
};
