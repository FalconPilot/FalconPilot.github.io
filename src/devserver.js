const fs = require('fs')
const path = require('path')
const express = require('express')

const app = express()

const PORT = 2424

const renderFile = (req, res) => {
  const contentsPath = path.resolve(__dirname, '..', req.params.prefix || '.', req.params.slug)
  const contents = fs.readFileSync(contentsPath)
  res.contentType(req.params.slug).send(contents)
}

app.get('/:slug', renderFile)
app.get('/:prefix/:slug', renderFile)

app.listen(PORT, 'localhost', () => {
  console.log(`Server listening on port ${PORT}`)
})
