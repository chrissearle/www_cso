import Browse from "./Browse";
import LatestArticles from "./LatestArticles";
import PopularTags from "./PopularTags";
import Search from "./Search";

export default function Sidebar({ files }) {
  return (
    <div className="sidebar">
      <Search />
      <Browse />
      <PopularTags files={files} />
      <LatestArticles files={files} />
    </div>
  );
}
