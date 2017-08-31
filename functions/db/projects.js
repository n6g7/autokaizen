const admin = require('firebase-admin')

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

function setCurrentSprint (boardId, sprintNumber) {
  return admin
    .database()
    .ref(`projects/${boardId}/currentSprint`)
    .set(sprintNumber)
}

function isRedBucketLabel (boardId, labelId) {
  return admin
    .database()
    .ref(`projects/${boardId}/labels/${labelId}`)
    .once('value')
    .then(snap => snap.exists())
}

function addDefect (boardId, cardId, cardNumber, labelId, userStory) {
  return admin
    .database()
    .ref(`projects/${boardId}`)
    .once('value')
    .then(snap => {
      const { currentSprint } = snap.val()

      return snap.ref.child('defects').push({
        analysed: false,
        cardId,
        cardNumber,
        creation: Date.now()
        labelId,
        sprint: currentSprint,
        userStory
      })
    })
}

function removeDefect (boardId, cardId, labelId) {
  return admin
    .database()
    .ref(`projects/${boardId}/defects`)
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
  removeDefect,
  setCurrentSprint
}
