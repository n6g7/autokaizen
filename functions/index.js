const admin = require('firebase-admin')
const functions = require('firebase-functions')

admin.initializeApp(functions.config().firebase)

exports.authorization = require('./authorization')
exports.followBoard = require('./follow')
exports.trelloHook = require('./hook')
