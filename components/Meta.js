import Head from "next/head";

import { lookup } from "mime-types";
import { metaDate } from "utils/dateutils";

export default function Meta(props) {
  const logo = process.env.NEXT_PUBLIC_SITE_URL + "/logo.png";

  let metafields = {
    description: process.env.NEXT_PUBLIC_SITE_NAME,
    image: logo,
    "og:url": process.env.NEXT_PUBLIC_SITE_URL,
    "og:type": "website",
    "og:title": process.env.NEXT_PUBLIC_SITE_NAME,
    "og:description": process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
    "og:image": logo,
    "og:image:type": lookup(logo),
    "og:image:width": "300",
    "og:image:height": "300",
  };

  if (props.title) {
    metafields.description = props.title;
    metafields["og:title"] = props.title;
  }

  if (props.post) {
    const post = props.post;
    const frontmatter = post.frontmatter;

    if (frontmatter.intro) {
      metafields["og:description"] = frontmatter.intro;
    }
    metafields["description"] = frontmatter.title;
    metafields["og:title"] = frontmatter.title;
    metafields["og:url"] = process.env.NEXT_PUBLIC_SITE_URL + "/" + post.path;
    metafields["og:type"] = "article";
    metafields["article:published_time"] = metaDate(frontmatter.date);
    if (frontmatter.updated) {
      metafields["article:modified_time"] = metaDate(frontmatter.updated);
    }
    metafields["og:author"] = "https://about.me/chrissearle";

    if (frontmatter.image) {
      const image = frontmatter.image;

      const imageUrl = process.env.NEXT_PUBLIC_SITE_URL + post.imagePath;

      metafields.image = imageUrl;
      metafields["og:image"] = imageUrl;

      metafields["og:image:type"] = lookup(imageUrl);

      delete metafields["og:image:width"];
      delete metafields["og:image:height"];
    }
  }

  let fields = {
    name: [],
    property: [],
  };

  Object.keys(metafields).forEach((key) => {
    const fieldData = {
      field: key,
      value: metafields[key],
    };

    if (key.startsWith("og")) {
      fields.property.push(fieldData);
    } else {
      fields.name.push(fieldData);
    }
  });

  return (
    <>
      {fields.name.map((field, index) => (
        <meta key={`name-${index}`} name={field.field} content={field.value} />
      ))}
      {fields.property.map((field, index) => (
        <meta
          key={`property-${index}`}
          property={field.field}
          content={field.value}
        />
      ))}
    </>
  );
}
