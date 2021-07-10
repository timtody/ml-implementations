import moment from "moment";
import TagPane from "../components/TagPane";

export default function ArticleHeader({ slug, author, date, tags }) {
  return (
    <>
      <div className="text-3xl">{slug}</div>
      <div className="flex space-x-4 text-gray-500 text-sm py-2 items-center">
        <div>{author}</div>
        <div>{moment(date).fromNow()}</div>
        <div className="flex flex-row space-x-2">
          <TagPane tags={tags} />
        </div>
      </div>
    </>
  );
}
