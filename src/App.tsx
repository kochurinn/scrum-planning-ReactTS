import { useState } from 'react'

function App() {
  const [modalStatus, setModalStatus] = useState(false)

  const onClickAddPlayer = () => {
    setModalStatus(true)
  }

  const onClickCloseModal = () => {
    setModalStatus(false)
  }

  return (
    <>
      <div>
        <div 
          className="add-player"
          onClick={onClickAddPlayer}
          >
            Add player
        </div>

        <div className={`overlap ${modalStatus ? '' : 'd-none'}`}>
          <div className="modal">
            <div className="modal__close" onClick={onClickCloseModal}></div>
            <div className="modal__title">Добавить игрока</div>
            <input type="text" placeholder='Введите имя игрока' />
            <div className="modal__btn">Добавить</div>
          </div>
        </div>
        

      </div>
    </>
  )
}

export default App
