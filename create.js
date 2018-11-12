#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const moment = require('moment-timezone')
const slugify = require('slugify')

const prefix = `src/blog`
const title = process.argv[2]
const date = moment.tz('Europe/Oslo')
const slug = slugify(title, { lower: true })
const frontmatter = `---
title: ${title}
date: ${date.format('YYYY-MM-DD HH:mm z')}
tags: 
---
`

const folder = path.join(__dirname, prefix, date.format('YYYY/MM'))
const filename = path.join(folder, `${date.format('DD')}-${slug}`)

fs.mkdir(folder, { recursive: true }, err => {
  if (err) {
    console.log(err.message)
  }

  fs.writeFile(filename, frontmatter, err2 => {
    if (err2) {
      console.log(err2.message)
    }
  })
})
