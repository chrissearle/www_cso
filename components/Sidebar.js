import Browse from "./Browse";
import LatestArticles from "./LatestArticles";
import PopularTags from "./PopularTags";
import Search from "./Search";

export default function Sidebar({ files }) {
  return (
    <div className="drawer-side">
      <label htmlFor="right-drawer" className="drawer-overlay"></label>
      <div>
        <Search />
        <Browse />
        <PopularTags files={files} />
        <LatestArticles files={files} />
      </div>
    </div>
  );
}
