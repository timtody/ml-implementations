import { useEffect, useState } from "react";

export default function Search({ items }) {
  const [results, setResults] = useState(items);
  useEffect(() => {}, []);
  return (
    <>
      <input
        className="rounded border mt-16 mb-4 h-10 z-50 bg-white px-2 text-xs text-gray-500"
        type="text"
        placeholder="Search"
        onChange={async (e) => {
          const { value } = e.currentTarget;
          // Dynamically load fuse.js
          const Fuse = (await import("fuse.js")).default;
          const fuse = new Fuse(items);
          setResults(fuse.search(value));
        }}
      />
      <div>Results: {results}</div>
    </>
  );
}
