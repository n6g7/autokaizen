const admin = require('firebase-admin')

function getCurrent (boardId) {
  return admin
    .database()
    .ref(`sprints/${boardId}`)
    .orderByChild('start')
    .limitToLast(1)
    .once('child_added')
    .then(snapshot => parseInt(snapshot.key))
}

function start (boardId, sprintNumber) {
  return admin
    .database()
    .ref(`sprints/${boardId}/${sprintNumber}`)
    .set({
      start: Date.now()
    })
}

module.exports = {
  getCurrent,
  start
}
