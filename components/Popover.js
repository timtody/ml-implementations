export default function PopOver({ visible, children }) {
  return (
    <p
      className={
        (!visible ? "opacity-0" : "opacity-100") +
        " border rounded-md bg-gray-50 z-50 shadow p-2 space-y-2 transition-all absolute"
      }
    >
      {children}
    </p>
  );
}
