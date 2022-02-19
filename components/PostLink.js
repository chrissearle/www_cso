import Link from "next/link";

export default function PostLink({
  title: linkTitle,
  params,
  heading = false,
  className = null,
}) {
  let title = <a>{linkTitle}</a>;

  if (heading) {
    title = <a className="h5 text-decoration-none">{linkTitle}</a>;
  }

  if (className) {
    title = <a className={className}>{linkTitle}</a>;
  }

  return (
    <Link
      href={{
        pathname: "/[year]/[month]/[day]/[slug]/",
        query: {
          year: params.year,
          month: params.month,
          day: params.day,
          slug: params.slug,
        },
      }}
    >
      {title}
    </Link>
  );
}
