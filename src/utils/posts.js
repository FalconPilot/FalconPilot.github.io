const fs = require('fs')
const rimraf = require('rimraf')

const { buildMarkdown, buildMarkdownFiles } = require('./markdown')
const { postsPath, srcPostsPath } = require('../constants/paths')

const buildPost = async (filename) => buildMarkdown(postsPath)(srcPostsPath, filename)

const buildPosts = async () => {
  rimraf.sync(postsPath)
  fs.mkdirSync(postsPath)

  const files = fs.readdirSync(srcPostsPath)
  return buildMarkdownFiles(buildPost)(files)
}

module.exports = {
  buildPosts
}
