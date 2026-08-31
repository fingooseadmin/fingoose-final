export default function FlowWords({ children, className = "" }) {
  const text = String(children);
  const words = text.trim().split(/\s+/);

  return (
    <span className={`flow-words ${className}`} aria-label={text}>
      {words.map((word, index) => (
        <span
          aria-hidden="true"
          className="flow-word"
          key={`${word}-${index}`}
          style={{
            "--word-index": index,
            "--word-delay": `${index * 58}ms`
          }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
