function parseAuthors(auhtorString) {
  let authors = auhtorString.split(" and ");
  return authors
    .map((el) => {
      const [lastName, firstName] = el.split(", ");
      return ` ${lastName} ${firstName[0]}.`;
    })
    .join();
}

export default function References({ bib }) {
  return (
    <>
      <hr className="mt-4 mb-0" />
      <div className="text-gray-400 text-sm mb-2">References</div>
      <div className="text-gray-500 space-y-2">
        {Object.entries(bib).map(([_, bibEntry]) => {
          return (
            <div>
              {parseAuthors(bibEntry.author)} ({bibEntry.year}).{" "}
              {bibEntry.title}. {bibEntry.journal}.
            </div>
          );
        })}
      </div>
    </>
  );
}
