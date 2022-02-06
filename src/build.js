const { buildStaticPages, buildPages } = require('./utils/pages')
const { buildPosts } = require('./utils/posts')

const init = () => (
  buildPages()
    .then(buildStaticPages)
    .then(buildPosts)
)

init().then(() => {
  console.log('Finished !')
}).catch(console.error)
