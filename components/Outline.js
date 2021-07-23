export default function Outline({ className, toc }) {
  return (
    <div className={`${className} text-gray-500 pb-0 border-l`}>
      {tocToReact(toc)}
    </div>
  );
}

function tocToReact(headings, depth = 2) {
  if (headings[0]?.depth === depth) return;
  return (
    <div className="pl-2">
      {headings?.map((children, index) => {
        return (
          <a key={index} href={`#${children.value}`}>
            <div className={depthToTailwindClass(children.depth)}>
              {children.value}
            </div>
            {tocToReact(children.children)}
          </a>
        );
      })}
    </div>
  );
}

function depthToTailwindClass(depth) {
  switch (depth) {
    case 1:
      return "text-sm";
    case 2:
      return "text-sm dark:text-gray-200";
    case 3:
      return "text-sm dark:text-gray-200";
    case 4:
      return "text-sm dark:text-gray-200";
  }
}
