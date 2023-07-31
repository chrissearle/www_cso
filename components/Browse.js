import Link from "next/link";

export default function Browse() {
  return (
    <div className="bg-base-100 p-4">
      <h2 className="mb-2 font-bold">Browse</h2>
      <ul className="menu h-full bg-base-200 text-base-content">
        <li>
          <Link href="/tags/">All Tags</Link>
        </li>
        <li>
          <Link href="/articles/">All Articles</Link>
        </li>
        <li>
          <Link href="/years/">By Year</Link>
        </li>
        <li>
          <Link href="/series/">By Series</Link>
        </li>
      </ul>
    </div>
  );
}
