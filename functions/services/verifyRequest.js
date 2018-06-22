const crypto = require('crypto')
const functions = require('firebase-functions')

const base64Digest = secret => data =>
  crypto.createHmac('sha1', secret).update(data).digest('base64')

function verifyTrelloWebhookRequest (request) {
  const header = request.headers['x-trello-webhook']
  if (!header) return false

  const {
    hook_url: hookUrl,
    trello_secret: trelloSecret
  } = functions.config().app

  const digest = base64Digest(trelloSecret)

  const content = `${JSON.stringify(request.body)}${hookUrl}`
  const doubleHash = digest(digest(content))
  const headerHash = digest(header)

  return doubleHash === headerHash
}

module.exports = verifyTrelloWebhookRequest
