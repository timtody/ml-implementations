import Link from "next/link";

export default function Sidebar({ children, className }) {
  return (
    <nav className={className}>
      <ul>
        {children?.map((child) => (
          <li className="dark:text-indigo-50">
            <Link href={child}>{child}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
