export function Tag({
  color,
  children,
  className,
  onMouseEnter,
  onMouseLeave,
}) {
  return (
    <p
      className={`rounded p-1 bg-${color}-100 text-${color}-500 ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </p>
  );
}
