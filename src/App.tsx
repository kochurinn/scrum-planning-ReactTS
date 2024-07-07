import { useMemo } from 'react'
import Home from './components/home/Home'
import Workspace from './components/workspace/Workspace'
import { Route, Routes, useParams } from 'react-router-dom'
import { io } from 'socket.io-client'
import { SocketContext } from './contexts/socketContext'
import Test from './components/test/test'
import Room from './components/room/Room'

const App = () => {
  const socket = useMemo(() => {
    return io('ws://localhost:5000')
  }, [])
  return (
    <SocketContext.Provider value={socket}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/room/:id' element={<Room />} />
        <Route path='/workspace' element={<Workspace />} />
        <Route path='/test' element={<Test />} />
      </Routes>
    </SocketContext.Provider>
  )
}

export default App