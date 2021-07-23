export default function Paper({ authors, title }) {
  return (
    <div className="bg-gray-100 rounded  text-sm p-2 flex justify-between flex-col space-y-2">
      <div>{title}</div>
      <div className="text-sm font-thin">{authors}</div>
    </div>
  );
}
