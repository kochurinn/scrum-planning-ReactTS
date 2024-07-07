import { useState } from "react"
import { useSocketContext } from "../../contexts/socketContext"

const Test = () => {
  const socket = useSocketContext()
  const [messages, setMessages] = useState<string[]>([])
  const [message, setMessage] = useState('')

  socket.on('message', (msg) => {
    setMessages([...messages.slice(-4), msg])
  })
  const send = () => {
    socket.emit('message', message)
  }
  return (
    <div>
      <textarea value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={send}>Send</button>
      <ul>
        {messages.map(m => (
          <li>{JSON.stringify(m)}</li>
        ))}
      </ul>
    </div>
  )
}

export default Test
