const admin = require('firebase-admin')
const functions = require('firebase-functions')

admin.initializeApp(functions.config().firebase)

exports.authorization = require('./authorization')
exports.backup = require('./backup')
exports.followBoard = require('./follow')
exports.trelloHook = require('./hook')
