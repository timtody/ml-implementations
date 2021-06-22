export default function Outline({ className, toc }) {
  return (
    <div className={`${className} dark:text-gray-200`}>{tocToReact(toc)}</div>
  );
}

function tocToReact(headings) {
  return (
    <div className="pl-2 bg-gray-200 rounded">
      {headings?.map((children) => (
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
    return "text-xl";
  } else if (depth == 2) {
    return "text-lg dark:text-gray-200";
  } else if (depth == 3) {
    return "text-base dark:text-gray-200";
  } else if (depth == 4) {
    return "text-sm dark:text-gray-200";
  }
}
