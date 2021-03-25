const { buildStaticPages, buildPages } = require('./utils/pages')
const { buildPosts } = require('./utils/posts')

const init = async () => {
  await buildPages()
  await buildStaticPages()
  await buildPosts()
}

init().then(() => {
  console.log('Finished !')
})
