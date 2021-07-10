export default function PopOver({ visible, children }) {
  return (
    <p
      className={
        !visible ? "hidden" : "" + "bg-green-200  absolute flex flex-col"
      }
    >
      {children}
    </p>
  );
}
