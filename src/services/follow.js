export default function (token, boardId) {
  return window.fetch(process.env.FOLLOW_URL, {
    method: 'POST',
    body: JSON.stringify({
      boardId,
      token
    }),
    headers: {
      'content-type': 'application/json'
    }
  })
}
