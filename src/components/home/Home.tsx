import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSocketContext } from "../../contexts/socketContext"

const Home = () => {
  const socket = useSocketContext();
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [roomName, setRoomName] = useState('')
  const [classInput, setClassInput] = useState('')

  const handleSubmit = () => {
    if (name) {
      localStorage.setItem('name', name)
      socket.emit('create room', roomName, name)
      socket.on('room created', id => {
        navigate(`/room/${id}`)
      })
    }
    setClassInput('input--empty')
  }

  return (
    <div className="form--wrapper">
      <div className="form">
        <div className="form__title">
          Введите своё имя
        </div>
        <input 
          className={`input ${classInput}`}
          type="text" 
          placeholder="имя игрока" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
        />
        <input 
          className={`input ${classInput}`}
          type="text" 
          placeholder="имя комнаты" 
          value={roomName} 
          onChange={(e) => setRoomName(e.target.value)}
        />
        <div 
          className="form__btn"
          onClick={handleSubmit}
        >
          Сохранить
        </div>
      </div>
    </div>
  )
}

export default Home