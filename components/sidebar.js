import Link from "next/link";
import _ from "lodash";
import Outline from "./outline";

function listColor(name, active) {
  return name == active ? "text-gray-800 font-semibold" : "font-normal";
}

function maybeInsertTOC(name, active, toc) {
  return name == active ? <Outline toc={toc} /> : "";
}

function mapFilesToList(e, active, toc) {
  return (
    <li key={e.Name}>
      <div className={`text-sm pl-0 pb-1 ${listColor(e.Name, active)}`}>
        <Link href={e.Name}>{e.Name}</Link>
      </div>
      <p>{maybeInsertTOC(e.Name, active, toc)}</p>
    </li>
  );
}

function mapCategoriesToList(value, key, active, toc) {
  return (
    <li className="" key={key}>
      {_.toUpper(key)}
      <ul className="space-y-1 list-none list-inside mb-2">
        {value.map((e) => mapFilesToList(e, active, toc))}
      </ul>
    </li>
  );
}

export default function Sidebar({ catsAndNames, className, active, toc }) {
  return (
    <ul className={`${className}`}>
      {_.map(catsAndNames, (value, key) =>
        mapCategoriesToList(value, key, active, toc)
      )}
    </ul>
  );
}
