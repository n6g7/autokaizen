const admin = require('firebase-admin')

const sprints = require('./sprints')

function isTracked (boardId) {
  return admin
    .database()
    .ref(`projects/${boardId}`)
    .once('value')
    .then(snapshot => snapshot.exists())
}

function createOrUpdate (boardId, data) {
  return admin
    .database()
    .ref(`projects/${boardId}`)
    .set(data)
}

function isRedBucketLabel (boardId, labelId) {
  return admin
    .database()
    .ref(`labels/${boardId}/${labelId}`)
    .once('value')
    .then(snap => snap.exists())
}

function addDefect (boardId, cardId, cardNumber, labelId, userStory) {
  return sprints.getCurrent(boardId)
    .then(sprint => admin
      .database()
      .ref(`defects/${boardId}`)
      .push({
        analysed: false,
        cardId,
        cardNumber,
        creation: Date.now(),
        labelId,
        sprint,
        userStory
      })
    )
}

function removeDefect (boardId, cardId, labelId) {
  return admin
    .database()
    .ref(`defects/${boardId}`)
    .once('value')
    .then(snapshot => {
      const defects = snapshot.val()

      const defectId = Object.keys(defects).find(defectId => {
        const defect = defects[defectId]

        return defect.cardId === cardId && defect.labelId === labelId
      })

      if (!defectId) return
      return snapshot.ref.child(defectId).remove()
    })
}

module.exports = {
  addDefect,
  createOrUpdate,
  isRedBucketLabel,
  isTracked,
  removeDefect
}
