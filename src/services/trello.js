export default {
  authorize () {
    return new Promise((resolve, reject) => {
      window.Trello.authorize({
        name: 'Auto Kaizen',
        persist: true,
        type: 'popup',
        success: resolve,
        error: reject
      })
    })
  },
  createWebhook (idModel, callbackURL) {
    return new Promise((resolve, reject) => {
      window.Trello.post(
        '/webhooks',
        {
          idModel,
          callbackURL
        },
        resolve,
        reject
      )
    })
  },
  getBoards () {
    return new Promise((resolve, reject) => {
      window.Trello.get(
        '/member/me/boards',
        resolve,
        reject
      )
    })
  },
  getBoardLabels (boardId) {
    return new Promise((resolve, reject) => {
      window.Trello.get(
        `/boards/${boardId}/labels`,
        {
          fields: 'color,id,name'
        },
        resolve,
        reject
      )
    })
  }
}
