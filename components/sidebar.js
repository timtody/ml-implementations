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
    <li key={e.Name} className="space-y-0">
      <div className={`text-sm ${listColor(e.Name, active)}`}>
        <Link href={e.Name}>{e.Name}</Link>
      </div>
      {maybeInsertTOC(e.Name, active, toc)}
    </li>
  );
}

function mapCategoriesToList(value, key, active, toc) {
  return (
    <li className="pb-1" key={key}>
      {_.toUpper(key)}
      <ul className="space-y-2 list-none list-inside mb-2">
        {value.map((e) => mapFilesToList(e, active, toc))}
      </ul>
    </li>
  );
}

export default function Sidebar({ catsAndNames, className, active, toc }) {
  return (
    <ul className={`space-y-2 ${className}`}>
      {_.map(catsAndNames, (value, key) =>
        mapCategoriesToList(value, key, active, toc)
      )}
    </ul>
  );
}
