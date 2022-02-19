import Link from "next/link";

export default function Browse() {
  return (
    <div className="my-2 card">
      <div className="card-header">Browse</div>
      <ul className="list-group">
        <li className="list-group-item">
          <Link href="/tags/">All Tags</Link>
        </li>
        <li className="list-group-item">
          <Link href="/articles/">All Articles</Link>
        </li>
        <li className="list-group-item">
          <Link href="/years/">By Year</Link>
        </li>
        <li className="list-group-item">
          <Link href="/series/">By Series</Link>
        </li>
      </ul>
    </div>
  );
}
