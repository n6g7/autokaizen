const admin = require('firebase-admin')
const functions = require('firebase-functions')

const boardTopic = id => `/topics/board.${id}`

function followBoard (token, boardId) {
  return admin.messaging().subscribeToTopic(
    token,
    boardTopic(boardId)
  )
}

function unfollowBoard (token, boardId) {
  return admin.messaging().unsubscribeToTopic(
    token,
    boardTopic(boardId)
  )
}

function newDefect (boardId, boardName, labelId, labelName, cardNumber) {
  const { base_url: baseUrl } = functions.config().app

  return admin.messaging().sendToTopic(
    boardTopic(boardId),
    {
      notification: {
        title: `New ${labelName} on ${boardName}`,
        body: `Ticket #${cardNumber}`,
        click_action: `${baseUrl}/projects/${boardId}`,
        icon: `${baseUrl}/ak.png`
      },
      data: {
        boardId,
        cardNumber: '' + cardNumber,
        labelId,
        type: 'newDefect'
      }
    }
  )
}

module.exports = {
  followBoard,
  newDefect,
  unfollowBoard
}
