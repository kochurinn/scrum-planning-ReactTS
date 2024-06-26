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
import socketIO, { Socket } from 'socket.io'

const app = express()
const PORT = 5000

const server = app.listen(PORT, () => {
  console.log('Сервер запущен')
})

const io = new socketIO.Server(server, {
  cors: {
    origin: '*'
  }
})

app.get('/api', (req, res) => {
  res.json({
    message: 'Привет'
  })
})

const genId = () => {
  let alpha = 'abcdefghijklmnopqrstuvwxyz'
  alpha += alpha.toUpperCase()
  alpha += '0123456789'
  return Array.from(
    { length: 7 },
    () => alpha[Math.floor(Math.random() * alpha.length)]
  ).join('')
}

type Member = {
  socket: Socket
  name: string
  selectedCard: number | null
}
type Room = {
  id: string,
  name: string
  members: Record<string, Member>
}
const rooms: Record<string, Room> = {}
const memberRooms: Record<string, string> = {}

io.on('connection', (socket) => {
  console.log('Новое подключение', socket.id)

  socket.on('create room', (roomName, memberName) => {
    const id = genId()
    socket.emit('room created', id)
    rooms[id] = {
      id,
      name: roomName,
      members: {
        [socket.id]: {
          socket,
          name: memberName,
          selectedCard: null
        }
      }
    }
    memberRooms[socket.id] = id
  })

  socket.on('join', (roomId, memberName) => {
    const room = rooms[roomId]
    if (!room) return
    for (const member of Object.values(room.members)) {
      member.socket.emit('new member', {
        id: socket.id,
        name: memberName
      })
    }
    room.members[socket.id] = {
      name: memberName,
      socket,
      selectedCard: null
    }
    memberRooms[socket.id] = roomId
  })

  socket.on('card choosen', (card) => {
    const roomId = memberRooms[socket.id]
    if (!roomId) return
    const room = rooms[roomId]
    if (!room) return
    for (const member of Object.values(room.members)) {
      if (member.socket.id !== socket.id) {
        member.socket.emit('card choosen', socket.id)
      }
    }
    room.members[socket.id].selectedCard = card
  })

  

  socket.on('message', (msg) => {
    console.log(msg)
    socket.broadcast.emit('message', msg)
  })
})