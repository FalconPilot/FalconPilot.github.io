const path = require('path')

const rootPath = path.resolve(__dirname, '..', '..')
const postsPath = path.resolve(rootPath, 'posts')

const srcPath = path.resolve(rootPath, 'src')
const srcPostsPath = path.resolve(srcPath, 'posts')
const templatesPath = path.resolve(srcPath, 'templates')
const pagesPath = path.resolve(srcPath, 'pages')
const staticPagesPath = path.resolve(srcPath, 'pages-static')

module.exports = {
  rootPath,
  postsPath,
  srcPath,
  srcPostsPath,
  templatesPath,
  pagesPath,
  staticPagesPath
}
