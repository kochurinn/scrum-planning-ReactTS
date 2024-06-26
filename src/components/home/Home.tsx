import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [classInput, setClassInput] = useState('')

  const handleSubmit = () => {
    if (name) {
      setClassInput('')
      navigate('/workspace')
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
          placeholder="game name" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
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