export function H1({ children }) {
  return (
    <div className="text-2xl font-bold dark:text-gray-200 heading">
      <span id={children} className="offset-heading">
        {" "}
      </span>
      {children}
    </div>
  );
}

export function H2({ children }) {
  return (
    <div className="text-xl font-bold dark:text-gray-200 heading">
      <span id={children} className="offset-heading"></span>
      {children}
    </div>
  );
}

export function H3({ children }) {
  return (
    <div className="text-l font-bold anchor dark:text-gray-200 heading">
      <span id={children} className="offset-heading"></span>
      {children}
    </div>
  );
}

export function H4({ children }) {
  return (
    <div className="font-bold anchor text-sm dark:text-gray-200 heading">
      <span id={children} className="offset-heading"></span>
      {children}
    </div>
  );
}
