import PostLink from "./PostLink";

import { displayDate } from "../utils/dateutils";

export default function ListPostList({ items }) {
  return (
    <ul className="list-group">
      {items.map((item, index) => (
        <li
          key={`item-${index}`}
          className="d-flex justify-content-between align-items-center list-group-item"
        >
          <PostLink title={item.frontmatter.title} params={item.params} />
          <span className="badge bg-info rounded-pill">
            {displayDate(item.frontmatter.date)}
          </span>
        </li>
      ))}
    </ul>
  );
}
