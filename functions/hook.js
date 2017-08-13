const functions = require('firebase-functions')
const { projects } = require('./db')

function processAction (action, res) {
  const {
    data: { board, card, label },
    type
  } = action

  return projects.isTracked(board.id)
  .then(tracked => {
    if (!tracked) return

    switch (type) {
      case 'addLabelToCard':
        return projects
          .isRedBucketLabel(board.id, label.id)
          .then(redBucket => redBucket
            ? projects.addDefect(board.id, card.id, card.idShort, label.id, card.name)
            : null
          )
      case 'removeLabelFromCard':
        return projects
          .isRedBucketLabel(board.id, label.id)
          .then(redBucket => redBucket
            ? projects.removeDefect(board.id, card.id, label.id)
            : null
          )
    }
  })
  .then(() => res.send('Done'))
}

module.exports = functions.https.onRequest((req, res) => {
  switch (req.method) {
    case 'POST':
      processAction(req.body.action, res)
      break
    default:
      // Don't send any data in case it's a HEAD request
      res.status(200).end()
  }
})
