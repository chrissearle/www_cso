import Link from "next/link";

export default function PostLink({
  title: linkTitle,
  params,
  heading = false,
  className = null,
}) {
  let calculatedClass = "";

  if (heading) {
    calculatedClass = "h5 text-decoration-none";
  }

  if (className) {
    calculatedClass = className;
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
      {linkTitle}
    </Link>
  );
}
