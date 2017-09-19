const functions = require('firebase-functions')
const { projects } = require('./db')
const { verifyRequest } = require('./services')

function processAction (action, res) {
  const {
    data: { board, card, label, list },
    type
  } = action

  return projects.isTracked(board.id)
  .then(tracked => {
    if (!tracked) throw Error(`This board isn't tracked: ${board.id}.`)

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
      case 'createList':
      case 'updateList':
        const result = /done.+#(\d+)/i.exec(list.name)

        return result
          ? projects.setCurrentSprint(board.id, parseInt(result[1]))
          : null
      default:
        console.log(`Unknown type: "${type}".`)
    }
  })
  .then(() => res.sendStatus(200))
  .catch(() => res.sendStatus(410)) // Delete hook when board isn't tracked.
}

module.exports = functions.https.onRequest((req, res) => {
  if (!verifyRequest(req)) {
    console.log(`Invalid request signature: ${req.headers['x-trello-webhook']}.`)
    return res.sendStatus(400)
  }

  switch (req.method) {
    case 'POST':
      processAction(req.body.action, res)
      break
    default:
      // Don't send any data in case it's a HEAD request
      res.sendStatus(200)
  }
})
