import Link from "next/link";
import _ from "lodash";

export default function Sidebar({ catsAndNames, className }) {
  return (
    <nav className={className}>
      <ul className="">
        {_.map(catsAndNames, (value, key) => {
          return (
            <li className="dark:text-indigo-200 mt-8" key={key}>
              {_.toUpper(key)}
              <ul className="space-y-1">
                {value.map((e) => (
                  <li className="dark:text-indigo-50">
                    <Link href={e.Name}>{e.Name}</Link>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
