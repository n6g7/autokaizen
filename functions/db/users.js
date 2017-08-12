const admin = require('firebase-admin')

function create (userId, access) {
  return admin
    .database()
    .ref(`users/${userId}`)
    .set({ access })
}

module.exports = {
  create
}
