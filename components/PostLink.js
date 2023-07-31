import Link from "next/link";

export default function PostLink({
  title: linkTitle,
  params,
  heading = false,
  className = null,
  wide = false,
  children,
}) {
  let calculatedClass = "";

  if (heading) {
    calculatedClass = "h5 text-decoration-none";
  }

  if (className) {
    calculatedClass = className;
  }

  let calculatedSpanClass = "w-48";

  if (wide) {
    calculatedSpanClass = "";
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
      className={calculatedClass}
    >
      <span className={calculatedSpanClass}>{linkTitle}</span>
      {children}
    </Link>
  );
}
