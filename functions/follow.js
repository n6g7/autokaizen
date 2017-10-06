const functions = require('firebase-functions')
const { defect } = require('./messaging')
const cors = require('cors')({origin: true})

module.exports = functions.https.onRequest((req, res) => cors(req, res, () => {
  switch (req.method) {
    case 'POST':
      const {
        boardId,
        token
      } = req.body

      if (!boardId || !token) return res.sendStatus(400)
      defect.followBoard(token, boardId).then(() => res.sendStatus(200))

      break
    default:
      // Don't send any data in case it's a HEAD request
      res.sendStatus(200)
  }
}))
