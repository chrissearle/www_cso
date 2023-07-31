import Link from "next/link";

export default function ListList({ names, items, linkPath, linkQueryName }) {
  return (
    <ul className="menu h-full bg-base-200 text-base-content">
      {names.map((item, index) => (
        <li key={`item-${index}`}>
          <Link
            href={{
              pathname: linkPath,
              query: {
                [linkQueryName]: item,
              },
            }}
          >
            {item}
            <span className="badge badge-outline">{items[item]}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
