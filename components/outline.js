export default function Outline({ className, toc }) {
  return (
    <div className={`${className} dark:text-indigo-50`}>
      <div className="dark:text-indigo-200 mb-2">OUTLINE</div>
      {tocToReact(toc)}
    </div>
  );
}

function tocToReact(headings) {
  return (
    <div>
      {headings.map((children) => (
        <a href={`#${children.value}`}>
          <h1 className={mapDepthToTWClass(children.depth)}>
            {children.value}
          </h1>
          {tocToReact(children.children)}
        </a>
      ))}
    </div>
  );
}

function mapDepthToTWClass(depth) {
  if (depth === 1) {
    return "text-xl mt-2";
  } else if (depth == 2) {
    return "text-lg ml-1 dark:text-indigo-100";
  } else if (depth == 3) {
    return "text-base ml-2 dark:text-indigo-200";
  } else if (depth == 4) {
    return "text-sm ml-4 dark:text-indigo-300";
  }
}
