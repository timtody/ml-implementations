import Link from "next/link";
import _ from "lodash";

export default function Sidebar({ catsAndNames, className }) {
  return (
    <ul className={`${className}`}>
      {_.map(catsAndNames, (value, key) => {
        return (
          <li className="text-l list-inside list-none" key={key}>
            {_.toUpper(key)}
            <ul className="space-y-1 list-none list-inside mb-2">
              {value.map((e) => (
                <li className="text-sm pl-2 pb-1" key={key}>
                  <Link href={e.Name}>{e.Name}</Link>
                </li>
              ))}
            </ul>
          </li>
        );
      })}
    </ul>
  );
}
