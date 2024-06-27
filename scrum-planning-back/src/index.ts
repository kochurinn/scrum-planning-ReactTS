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
  id: string
  name: string
  cardsRevealed: boolean
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
      cardsRevealed: false,
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
    const roomData = {
      name: room.name,
      cardsRevealed: room.cardsRevealed,
      members: Object.fromEntries(
        Object.entries(room.members).map(([id, m]) => ([
          id,
          {
            name: m.name,
            selectedCard: room.cardsRevealed ? m.selectedCard : (m.selectedCard !== null)
          }
        ]))
      )
    }
    socket.emit('joined', roomData)
  })

  socket.on('card choosen', (card) => {
    const roomId = memberRooms[socket.id]
    if (!roomId) return
    const room = rooms[roomId]
    if (!room || room.cardsRevealed) return
    for (const member of Object.values(room.members)) {
      if (member.socket.id !== socket.id) {
        member.socket.emit('card choosen', socket.id)
      }
    }
    room.members[socket.id].selectedCard = card
  })

  socket.on('reveal cards', () => {
    const roomId = memberRooms[socket.id]
    if (!roomId) return
    const room = rooms[roomId]
    if (!room) return
    room.cardsRevealed = true
    const choosenCards = Object.fromEntries(
      Object.entries(room.members).map(([id, m]) => [id, m.selectedCard])
    )
    for (const member of Object.values(room.members)) {
      member.socket.emit('reveal cards', choosenCards)
    }
  })

  socket.on('reset', () => {
    const roomId = memberRooms[socket.id]
    if (!roomId) return
    const room = rooms[roomId]
    if (!room) return
    for (const member of Object.values(room.members)) {
      member.selectedCard = null
      member.socket.emit('reset')
    }
  })

  socket.on('disconnect', () => {
    const roomId = memberRooms[socket.id]
    delete memberRooms[socket.id]
    if (!roomId) return
    const room = rooms[roomId]
    if (!room) return
    delete room.members[socket.id]
    for (const member of Object.values(room.members)) {
      member.socket.emit('member left', socket.id)
    }
  })
})
