// import WebSocket from 'ws'

// const wsServer = new WebSocket.Server({ port: 9000 })

// wsServer.on('connection', (ws) => {
//   ws.on('open', () => {

//   })
//   ws.on('error', (err) => {

//   })
//   ws.on('close', () => {

//   })
//   ws.on('message', (data) => {
//     const message = JSON.parse(data.toString('utf-8'))
//     if (message.type === '') {

//     } else if (message.type === '') {

//     }
//   })
// })


import express from 'express'
import socketIO from 'socket.io'

const app = express()
const PORT = 5000

const server = app.listen(PORT, () => {
  console.log('Server working')
})

const io = new socketIO.Server(server, {
  cors: {
    origin: 'http://localhost:5173'
  }
})

app.get('/api', (req, res) => {
  res.json({
    message: 'Hello'
  })
})

io.on('connection', (socket) => {
  console.log(`${socket.id} connected`)
  socket.on('create-room', (data: { name: string }) => {
    
    io.emit('response', {
      id: socket.id,
      room: 'room'
    })
  })
  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnect`)
  })
})