export function H1({ children }) {
  return (
    <div id={children} className="text-3xl font-bold dark:text-indigo-50">
      {children}
    </div>
  );
}

export function H2({ children }) {
  return (
    <div id={children} className="text-2xl font-bold dark:text-indigo-50">
      {children}
    </div>
  );
}

export function H3({ children }) {
  return (
    <div id={children} className="text-xl font-bold dark:text-indigo-50">
      {children}
    </div>
  );
}

export function H4({ children }) {
  return (
    <div id={children} className="text-l font-bold dark:text-indigo-50">
      {children}
    </div>
  );
}
