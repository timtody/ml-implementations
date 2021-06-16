export function Tag({ color, children }) {
  return (
    <div className={`rounded p-1 bg-${color}-100 text-${color}-500`}>
      {children}
    </div>
  );
}
