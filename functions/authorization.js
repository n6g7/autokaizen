const functions = require('firebase-functions')
const { users } = require('./db')

function hasAccess (email) {
  const result = /.+@([a-z0-9-]+(\.[a-z]{2,})+)$/.exec(email)
  const emailDomain = result[1]

  const { allowed_domains } = functions.config().app

  return allowed_domains.split(',').includes(emailDomain)
}

module.exports = functions.auth.user().onCreate(event => {
  const { email, uid } = event.data

  return users.create(uid, hasAccess(email))
})
