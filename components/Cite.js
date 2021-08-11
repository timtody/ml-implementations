export default function Cite({ bib, children, referenceContainer }) {
  const bibItem = bib[children];
  const authors = bibItem.author.split(" and ");
  let authorToken;

  switch (authors.length) {
    case 1:
      authorToken = authors[0].split(", ")[1];
      break;
    case 2:
      authorToken =
        authors[0].split(", ")[1] + " and " + authors[1].split(", ")[1];
      break;
    default:
      authorToken = authors[0].split(", ")[1] + " et al.";
      break;
  }
  return (
    <a className="text-blue-900" href="#">
      {authorToken} ({bibItem?.year})
    </a>
  );
}
