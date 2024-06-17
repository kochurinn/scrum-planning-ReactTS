import { useMemo } from 'react'
import Home from './components/home/Home'
import Workspace from './components/workspace/Workspace'
import { Route, Routes } from 'react-router-dom'
import { io } from 'socket.io-client'
import { SocketContext } from './contexts/socketContext'

const App = () => {
  const socket = useMemo(() => {
    return io('ws://localhost:5000')
  }, [])
  return (
    <SocketContext.Provider value={socket}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/workspace' element={<Workspace />} />
      </Routes>
    </SocketContext.Provider>
  )
}

export default App