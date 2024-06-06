import { useState } from 'react'

type Player = {
  name: string
  active: boolean
  chooseCard: number | null
}

function App() {
  const [modalStatus, setModalStatus] = useState(false)
  const [name, setName] = useState('')
  const [players, setPlayers] = useState<Player[]>([])
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const [activePlayer, setActivePlayer] = useState('')
  const [tableCards, setTableCards] = useState<Array<number>>([])
  const [revealCard, setRevealCard] = useState(false)
  const [result, setResult] = useState<number | null>(null)

  const cardsModul = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8],
    [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89] //пока что не используется
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
      chooseCard: null
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

  const setChooseCard = (cardNumber: number) => {
    const modifiedPlayers = players
    modifiedPlayers.forEach(player => {
      if (player.active === true) {
        player.chooseCard = cardNumber
      }
    })
    setActiveCard(cardNumber)
    setRevealCard(true)
    setPlayers(modifiedPlayers)
  }

  const changeStateCardTable = (player: Player) => {
    if (player.chooseCard === null) {
      return ''
    }
    if (result !== null) {
      return 'table__cards-elem--opened'
    }
    return 'table__cards-elem--closed'
  }

  const calcResult = () => {
    const result = players.reduce((acc, player) => player.chooseCard + acc, 0)
    setResult((result / players.length).toFixed(1))
    setActivePlayer('')
  }

  const onClickNewGame = () => {
    setModalStatus(false)
    setName('')
    setPlayers([])
    setActiveCard(null)
    setActivePlayer('')
    setTableCards([])
    setRevealCard(false)
    setResult(null)
  }


  return (
    <>
      <div>
        <div className="header">
          <div 
            className={`new-game ${result !== null ? '' : 'd-none'}`}
            onClick={onClickNewGame}
            >
              New game
          </div>
          <div className={`d-flex ${result === null ? '' : 'd-none'}`}>
            <div 
              className="add-player"
              onClick={onClickAddPlayer}
              >
                Add player
            </div>

            <div className="players">
              { players.map((player, index) => (
                <div 
                  key={index} 
                  className={`players__elem ${player.name === activePlayer ? 'players__elem--selected' : ''}`} 
                  onClick={() => setActiveWorkspace(player.name)}
                  >
                    {player.name}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="table">
          <div className="table__center">
            <div className={`${revealCard ? 'd-none' : ''}`}>Pick your cards!</div>
            <div 
              className={`revealBtn ${!revealCard ? 'd-none' : ''}`} 
              onClick={() => calcResult()}
              >
                Reveal cards
            </div>
          </div>
          <div className="table__cards">
            { players.map((player, index) => (
              <div>
                <div key={index} className={`table__cards-elem ${changeStateCardTable(player)}`}>{player.chooseCard}</div>
                <div>{player.name}</div>
              </div>
            )) }
          </div>
        </div>

        <div className={`cards ${activePlayer !== '' ? '' : 'd-none'}`}>
          { cardsModul[0].map((card, index) => (
            <div 
              key={index} 
              className={`cards__elem ${card === activeCard ? 'cards__elem--selected' : ''}`} 
              onClick={() => setChooseCard(card)}
              >
                {card}
            </div>
          )) }
        </div>
        
        <div className={`result ${result ? '' : 'd-none'}`}>Average: {result ? result : 0}</div>


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
