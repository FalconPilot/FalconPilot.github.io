const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

const { buildMarkdown, buildMarkdownFiles } = require('./markdown')
const { rootPath, staticPagesPath, pagesPath, templatesPath } = require('../constants/paths')

const buildStaticPage = async (filename) => buildMarkdown(rootPath)(staticPagesPath, filename)

const buildStaticPages = async () => {
  const files = fs.readdirSync(staticPagesPath)
  return buildMarkdownFiles(buildStaticPage)(files)
}

const buildPage = async (filename, data) => new Promise(async (resolve, reject) => {
  try {
    console.log(`> Building ${filename}.ejs...`)
    const content = await ejs.renderFile(path.resolve(pagesPath, `${filename}.ejs`))
    const page = await ejs.renderFile(path.resolve(templatesPath, 'page.ejs'), {
      ...data,
      pageBody: content
    })

    fs.writeFileSync(path.resolve(rootPath, `${filename}.html`), page, 'utf-8')
    resolve()
  } catch (err) {
    reject(err)
  }
})

const buildIndex = async () => buildPage('index', {
  title: null,
  urlPath: '',
  pageTitle: 'Bienvenue sur le Blog de Prog\''
})

const buildPages = async () => Promise.all([
  buildIndex()
])

module.exports = {
  buildStaticPages,
  buildPages
}
