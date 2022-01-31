const fs = require('fs')
const path = require('path')
const exec = require('child_process').exec
const ejs = require('ejs')

const { rootPath, templatesPath } = require('../constants/paths')

const buildMarkdown = (distPath) => (srcPath, filename) => new Promise((resolve, reject) => {
    const filePath = path.resolve(srcPath, `${filename}.markdown`)
    exec(`pandoc -f markdown -t html ${filePath}`, async (err, stdout, stderr) => {
      try {
        const fail = err || stderr
        if (fail) {
          throw new Error(fail)
        }

        const srcContents = fs.readFileSync(filePath, 'utf-8')
        const match = srcContents.match(/^(?:-+?)\r?\ntitle: (.*?)\r?\n(?:-+?)/g)
        if (!match) {
          throw new Error('Cannot find title')
        }

        const title = match[1]

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
      } catch (err) {
        console.error(`Error in "${filename}.markdown": ${err.message}`)
        reject(err)
      }
    })
})

const buildMarkdownFiles = buildFunction => files => (
  Promise.all(
    files
      .filter(f => f.match(/\.markdown$/))
      .map(filename => {
        console.log(`> Building ${filename}...`)
        return buildFunction(filename.replace(/\.markdown$/, ''))
      })
  ).catch(console.error)
)

module.exports = {
  buildMarkdown,
  buildMarkdownFiles
}
