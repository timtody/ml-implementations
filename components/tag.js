export function Tag({ color, children, className, onClick = () => {} }) {
  return (
    <button
      className={`rounded shadow-sm p-1 bg-${color}-200 text-${color}-800 ${className} 
      focus:outline-none hover:bg-${color}-300 hover:text-${color}-900`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
