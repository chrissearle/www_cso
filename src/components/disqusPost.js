import React from 'react'

import { DiscussionEmbed } from 'disqus-react'

const Discussion = ({ title, url }) => {
  const config = {
    url: url,
    title: title,
  }

  return <DiscussionEmbed shortname="chris-searle" config={config} />
}

export default Discussion
