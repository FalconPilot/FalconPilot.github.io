const fs = require('fs')
const path = require('path')
const exec = require('child_process').exec
const ejs = require('ejs')

const { rootPath, templatesPath } = require('../constants/paths')

const getMarkdownTitle = filePath => {
  const srcContents = fs.readFileSync(filePath, 'utf-8')
  const match = srcContents.match(/^(?:-+?)\r?\ntitle: (.*?)\r?\n(?:-+?)/)
  return match[1]
}

const buildMarkdown = (distPath) => async (srcPath, filename) => new Promise((resolve, reject) => {
  const filePath = path.resolve(srcPath, `${filename}.markdown`)
  exec(`pandoc -f markdown -t html ${filePath}`, async (err, stdout, stderr) => {
    const fail = err || stderr
    if (fail) {
      reject(fail)
    }

    const title = getMarkdownTitle(filePath)

    const rootRegex = new RegExp(`${rootPath.replace(/([/.])/g, '\\$1')}`)
    const urlRoot = distPath.replace(rootRegex, '')
    const urlPath = `${urlRoot}/${filename}.html`

    const content = await ejs.renderFile(path.resolve(templatesPath, 'page.ejs'), {
      title,
      pageTitle: title,
      urlPath,
      pageBody: stdout
    })

    fs.writeFileSync(path.resolve(distPath, `${filename}.html`), content)

    resolve()
  })
})

const buildMarkdownFiles = buildFunction => async files => (
  Promise.all(
    files.filter(f => f.match(/\.markdown$/))
      .map(async filename => {
        console.log(`> Building ${filename}...`)
        buildFunction(filename.replace(/\.markdown$/, ''))
      })
  )
)

module.exports = {
  getMarkdownTitle,
  buildMarkdown,
  buildMarkdownFiles
}
