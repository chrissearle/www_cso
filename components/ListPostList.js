import PostLink from "./PostLink";
import { displayDate } from "../utils/dateutils";

export default function ListPostList({ items, wide }) {
  return (
    <ul className="menu h-full bg-base-200 text-base-content">
      {items.map((item, index) => (
        <li key={`item-${index}`}>
          <PostLink
            title={item.frontmatter.title}
            params={item.params}
            wide={wide}
          >
            <span className="badge badge-outline">
              {displayDate(item.frontmatter.date)}
            </span>
          </PostLink>
        </li>
      ))}
    </ul>
  );
}
