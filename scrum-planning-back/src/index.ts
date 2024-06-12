import WebSocket from 'ws'

const wsServer = new WebSocket.Server({ port: 9000 })



wsServer.on('connection', (ws) => {
  ws.on('open', () => {

  })
  ws.on('error', (err) => {

  })
  ws.on('close', () => {

  })
  ws.on('message', (data) => {
    const message = JSON.parse(data.toString('utf-8'))
    if (message.type === '') {

    } else if (message.type === '') {

    }
  })
})
