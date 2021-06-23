export default function Outline({ className, toc }) {
  return (
    <div className={`${className} text-gray-500 pb-0 border-l`}>
      {tocToReact(toc)}
    </div>
  );
}

function tocToReact(headings) {
  return (
    <div className="pl-2">
      {headings?.map((children) => (
        <a key={children.value} href={`#${children.value}`}>
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
    return "text-sm";
  } else if (depth == 2) {
    return "text-sm dark:text-gray-200 hidden";
  } else if (depth == 3) {
    return "text-sm dark:text-gray-200 hidden";
  } else if (depth == 4) {
    return "text-sm dark:text-gray-200 hidden";
  }
}
