import { DiscussionEmbed } from "disqus-react";

const DisqusComments = ({ path, slug, title }) => {
  const disqusShortname = process.env.NEXT_PUBLIC_DISQUS_SHORTNAME;
  const disqusConfig = {
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/${path}/`,
    identifier: slug,
    title: title,
  };

  return (
    <div>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  );
};

export default DisqusComments;
