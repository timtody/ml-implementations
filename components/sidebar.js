import Link from "next/link";
import _ from "lodash";

function listColor(name, active) {
  return name == active ? "text-gray-800 font-semibold" : "font-normal";
}

function mapListItems(e, active) {
  return (
    <li
      className={`text-sm pl-2 pb-1 ${listColor(e.Name, active)}`}
      key={e.Name}
    >
      <Link href={e.Name}>{e.Name}</Link>
    </li>
  );
}

function mapCategoriesToList(value, key, active) {
  return (
    <li className="" key={key}>
      {_.toUpper(key)}
      <ul className="space-y-1 list-none list-inside mb-2">
        {value.map((e) => mapListItems(e, active))}
      </ul>
    </li>
  );
}

export default function Sidebar({ catsAndNames, className, active, toc }) {
  return (
    <ul className={`${className}`}>
      {_.map(catsAndNames, (value, key) =>
        mapCategoriesToList(value, key, active)
      )}
    </ul>
  );
}
