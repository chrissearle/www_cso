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
            <button className="mx-2 my-2 btn btn-outline-info btn-sm">
              {tag}
            </button>
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
          <button className="mx-2 btn btn-outline-success btn-sm">
            {series}
          </button>
        </Link>
      )}
    </>
  );
}
