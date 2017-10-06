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
    if (!tracked) {
      // Delete hook when board isn't tracked.
      console.log(`Deleted hook because this board isn't tracked: ${board.id}.`)
      return res.sendStatus(410)
    }

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
}

module.exports = functions.https.onRequest((req, res) => {
  switch (req.method) {
    case 'POST':
      if (!verifyRequest(req)) {
        console.log(`Invalid request signature: ${req.headers['x-trello-webhook']}.`)
        return res.sendStatus(400)
      }

      processAction(req.body.action, res)
      break
    default:
      // Don't send any data in case it's a HEAD request
      res.sendStatus(200)
  }
})
