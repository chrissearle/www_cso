import Link from "next/link";

function PaginationLink({ indexes, index, currentPage }) {
  let style = "join-item btn-xs";

  if (index === currentPage) {
    style = "join-item btn-xs btn-active";
  }

  let title = index;

  if (index === 1) {
    title = `« ${index}`;

    return (
      <Link href="/" className={style}>
        {title}
      </Link>
    );
  }

  if (index === indexes.length) {
    title = `${index} »`;
  }

  return (
    <Link
      href={{
        pathname: "/page/[page]/",
        query: {
          page: index,
        },
      }}
      className={style}
    >
      {title}
    </Link>
  );
}

export default function Pagination({ indexes, currentPage }) {
  return (
    <nav aria-label="Pagination">
      <div className="join">
        {indexes.map((index, idx) => (
          <PaginationLink
            key={`page-${idx}`}
            index={index}
            indexes={indexes}
            currentPage={currentPage}
          />
        ))}
      </div>
    </nav>
  );
}
