const crypto = require('crypto')
const functions = require('firebase-functions')

const base64Digest = secret => data =>
  crypto.createHmac('sha1', secret).update(data).digest('base64')

function verifyTrelloWebhookRequest (request) {
  const header = request.headers['x-trello-webhook']
  if (!header) return false

  const {
    hook_url,
    trello_secret
  } = functions.config().app

  const digest = base64Digest(trello_secret)

  const content = `${JSON.stringify(request.body)}${hook_url}`
  const doubleHash = digest(digest(content))
  const headerHash = digest(header)

  return doubleHash === headerHash
}

module.exports = verifyTrelloWebhookRequest
