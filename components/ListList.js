import Link from "next/link";

export default function ListList({ names, items, linkPath, linkQueryName }) {
  return (
    <ul className="list-group">
      {names.map((item, index) => (
        <li
          key={`item-${index}`}
          className="d-flex justify-content-between align-items-center list-group-item"
        >
          <Link
            href={{
              pathname: linkPath,
              query: {
                [linkQueryName]: item,
              },
            }}
          >
            {item}
          </Link>
          <span className="badge bg-info rounded-pill">{items[item]}</span>
        </li>
      ))}
    </ul>
  );
}
