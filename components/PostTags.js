import Link from "next/link";

export default function PostTags({ tags, series = null }) {
  return (
    <>
      {tags &&
        tags.split(", ").map((tag, index) => (
          <Link
            key={`tag-${index}`}
            href={{
              pathname: "/tags/[tag]",
              query: {
                tag: tag,
              },
            }}
            passHref
          >
            <div className="badge badge-outline">{tag}</div>
          </Link>
        ))}
      {series && (
        <Link
          href={{
            pathname: "/series/[series]",
            query: {
              series: series,
            },
          }}
          passHref
        >
          <div className="badge badge-outline badge-secondary">{series}</div>
        </Link>
      )}
    </>
  );
}
