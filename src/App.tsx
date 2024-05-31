import { useState } from 'react'

type Player = {
  name: string
  active: boolean
  chooseCard: number
}

function App() {
  const [modalStatus, setModalStatus] = useState(false)
  const [name, setName] = useState('')
  const [players, setPlayers] = useState<Player[]>([])
  const [activeCard, setActiveCard] = useState(-1)
  const [activePlayer, setActivePlayer] = useState('')
  const [tableCards, setTableCards] = useState<Array<number>>([])
  const [revealCard, setRevealCard] = useState(false)

  const cardsModul = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8],
    [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]
  ]

  const onClickAddPlayer = () => {
    setModalStatus(true)
  }

  const onClickCloseModal = () => {
    setModalStatus(false)
  }

  const addPlayer = () => {
    const player: Player = {
      name: name,
      active: false,
      chooseCard: -1
    }
    setPlayers([...players, player])
    setTableCards([...tableCards, 0])
    setName('')
    onClickCloseModal()
  }

  const setActiveWorkspace = (name: string) => {
    const modifiedPlayers = players
    modifiedPlayers.forEach(player => {
      player.active = false
      if (player.name === name) {
        player.active = true
        setActiveCard(player.chooseCard)
        setActivePlayer(player.name)
      }
    })
    setPlayers(modifiedPlayers)
  }

  const setChooseCard = (cardNumber: number, index: number) => {
    const modifiedPlayers = players
    modifiedPlayers.forEach(player => {
      if (player.active === true) {
        player.chooseCard = cardNumber
        changeStateCardTable(index, cardNumber)
      }
    })
    setActiveCard(cardNumber)
    setPlayers(modifiedPlayers)
  }

  const changeStateCardTable = (index: number, cardNumber: number) => {
    const modifiedTableCards = tableCards
    modifiedTableCards[index] = cardNumber
  }

  return (
    <>
      <div>
        <div className="header">
          <div 
            className="add-player"
            onClick={onClickAddPlayer}
            >
              Add player
          </div>

          <div className="players">
            { players.map((player, index) => (
              <div key={index} className={`players__elem ${player.name === activePlayer ? 'players__elem--selected' : ''}`} onClick={() => setActiveWorkspace(player.name)}>{player.name}</div>
            ))}
          </div>
        </div>
        
        <div className="table">
          <div className="table__center">Pick your cards!</div>
          <div className="table__cards">
            { tableCards.map((card, index) => (
              <div key={index} className={`table__cards-elem ${card ? 'table__cards-elem--closed' : ''}`}>{card}</div>
            )) }
          </div>
        </div>

        <div className="cards">
          { cardsModul[0].map((card, index) => (
            <div key={index} className={`cards__elem ${card === activeCard ? 'cards__elem--selected' : ''}`} onClick={() => setChooseCard(card, index)}>{card}</div>
          )) }
        </div>


        <div className={`overlap ${modalStatus ? '' : 'd-none'}`}>
          <div className="modal">
            <div className="modal__close" onClick={onClickCloseModal}></div>
            <div className="modal__title">Добавить игрока</div>
            <input type="text" placeholder='Введите имя игрока' value={name} onChange={(e) => setName(e.target.value)}/>
            <div className="modal__btn" onClick={() => addPlayer()}>Добавить</div>
          </div>
        </div>
        

      </div>
    </>
  )
}

export default App
