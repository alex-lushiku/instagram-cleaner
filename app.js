require('dotenv').config()
const { IgApiClient, IgLoginTwoFactorRequiredError, LikedFeed } = require('instagram-private-api')
const { MediaRepository } = require('instagram-private-api/dist/repositories/media.repository')
const ig = new IgApiClient()

ig.state.generateDevice(process.env.IG_USER)

const massUnsave = async (feed) => {
  const items = await feed.items()
  for (let i = 0;i < items.length;i++) {
    ig.media.unsave(items[i].id)
      .catch(e => {
        console.error(e)
      })
  }
}

// TODO: Rate limit
const massUnlike = async (feed) => {
  hasErrored = false;

  if (feed.isMoreAvailable && !hasErrored) {
    const items = await feed.items()
    for (let i = 0;i < items.length;i++) {
      ig.media.unlike({
        mediaId: items[i].id,
        moduleInfo: {
          module_name: 'media_view_profile',
        }
      }).catch(e => {
        console.error(e)
        hasErrored = true
      })
    }
  }
}

ig.account
  .login(process.env.IG_USER, process.env.IG_PASS)
  .catch(e => console.error(e))
  .then(async user => {
    const savedFeed = ig.feed.saved(user.pk)
    const likedFeed = ig.feed.liked(user.pk)

    setInterval(massUnlike(likedFeed), 400*1000)
  })