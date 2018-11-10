import React from 'react'

import AdSense from 'react-adsense'

const AdBoxFooter = () => {
  return (
    <AdSense.Google
      client="ca-pub-6208435820744910"
      slot="5379170846"
      style={{ width: '728px', height: '90px', display: 'inline-block' }}
    />
  )
}

export default AdBoxFooter
