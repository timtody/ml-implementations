import Link from "next/link";
import _ from "lodash";

export default function Sidebar({ catsAndNames, className }) {
  return (
    <ul className={`${className}`}>
      {_.map(catsAndNames, (value, key) => {
        return (
          <li className="text-l" key={key}>
            {_.toUpper(key)}
            <ul className="space-y-1 list-disc">
              {value.map((e) => (
                <li className="text-sm" key={key}>
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
