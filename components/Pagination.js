import Link from "next/link";

function PaginationLink({ indexes, index, currentPage }) {
  let style = "page-item";

  if (index === currentPage) {
    style = "page-item active";
  }

  let title = index;

  if (index === 1) {
    title = `« ${index}`;

    return (
      <li className={style}>
        <Link href="/">
          <a className="page-link">{title}</a>
        </Link>
      </li>
    );
  }

  if (index === indexes.length) {
    title = `${index} »`;
  }

  return (
    <li className={style}>
      <Link
        href={{
          pathname: "/page/[page]/",
          query: {
            page: index,
          },
        }}
      >
        <a className="page-link">{title}</a>
      </Link>
    </li>
  );
}

export default function Pagination({ indexes, currentPage }) {
  return (
    <nav aria-label="Pagination">
      <ul className="pagination justify-content-center my-5">
        {indexes.map((index, idx) => (
          <PaginationLink
            key={`page-${idx}`}
            index={index}
            indexes={indexes}
            currentPage={currentPage}
          />
        ))}
      </ul>
    </nav>
  );
}
