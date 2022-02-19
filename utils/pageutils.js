export function split(arr, chunkSize) {
  return arr
    .map((e, i) => {
      return i % chunkSize === 0 ? arr.slice(i, i + chunkSize) : null;
    })
    .filter((e) => {
      return e;
    });
}

export function buildListProps(posts, reverse = false) {
  let sorted = [];

  if (reverse) {
    sorted = Object.keys(posts).sort((a, b) => b.localeCompare(a));
  } else {
    sorted = Object.keys(posts).sort((a, b) => a.localeCompare(b));
  }

  return {
    items: posts,
    sortedItems: sorted,
  };
}

export function pagination(files) {
  const pages = split(files, 10);

  return {
    pages: pages,
    indexes: Array.from(Array(pages.length + 1).keys()).slice(1),
  };
}
