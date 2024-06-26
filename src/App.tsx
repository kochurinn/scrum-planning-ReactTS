import Home from './components/home/Home'
import Workspace from './components/workspace/Workspace'
import { Route, Routes } from 'react-router-dom'
import * as io from "socket.io-client";
import * as readline from 'node:readline'
import { stdin as input, stdout as output } from 'node:process';


const App = () => {
  
  const socket = io.connect('http://localhost:5000')
  const rl = readline.createInterface({ input, output })

  let nickname = null

  socket.on("connection", (socket) => {
    console.log('Клиент подключился')
    rl.question('Назови своё имя', (answer) => {
      nickname = answer
      mess()
    })
  })

  const mess = () => {
    rl.question('', (msg) => {
      socket.emit('message', msg)
    })
  }

  return (
    
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/workspace' element={<Workspace />} />
    </Routes>
  )
}

export default App