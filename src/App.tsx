import { useState } from 'react'

type Player = {
  id: symbol
  name: string
  chosenCard: number | null
}

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [name, setName] = useState('')
  const [players, setPlayers] = useState<Player[]>([])
  const [activePlayerId, setActivePlayerId] = useState<symbol | null>(null)
  const [revealCardAbility, setRevealCardAbility] = useState(false)
  const [result, setResult] = useState<number | null>(null)

  const activePlayer = players.find(p => p.id === activePlayerId)

  const cardsMode = [
    [1, 2, 3, 4, 5, 6, 7, 8],
    [1, 2, 3, 5, 8, 13, 21, 34, 55, 89] //пока что не используется
  ]

  const addPlayer = () => {
    const player = {
      id: Symbol(),
      name: name,
      active: false,
      chosenCard: null
    }
    setPlayers([...players, player])
    setName('')
    setIsModalVisible(false)
  }

  const setChosenCard = (cardNumber: number) => {
    const modifiedPlayers = [...players]
    const idx = modifiedPlayers.findIndex(p => p.id === activePlayerId)
    modifiedPlayers[idx] = {
      ...modifiedPlayers[idx],
      chosenCard: cardNumber
    }
    setRevealCardAbility(true)
    setPlayers(modifiedPlayers)
  }

  const getCardSateClass = (player: Player) => {
    if (player.chosenCard === null) {
      return ''
    }
    if (result !== null) {
      return 'table__cards-elem--opened'
    }
    return 'table__cards-elem--closed'
  }

  const calcResult = () => {
    const votedPlayers = players.filter(p => p.chosenCard !== null)
    const sum = votedPlayers.reduce((acc, p) => acc + p.chosenCard!, 0)
    setResult(+(sum / votedPlayers.length).toFixed(1))
  }

  const onClickNewGame = () => {
    setIsModalVisible(false)
    setName('')
    setActivePlayerId(null)
    setRevealCardAbility(false)
    setResult(null)
  }


  return (
    <>
      <div>
        <div className="header">
          {result && (
            <div 
              className="new-game"
              onClick={onClickNewGame}
            >
              New game
            </div>
          )}
          {!result && (
            <div className="d-flex">
              <div 
                className="add-player"
                onClick={() => setIsModalVisible(true)}
              >
                Add player
              </div>

              <div className="players">
                {players.map((player, index) => (
                  <div 
                    key={index} 
                    className={`players__elem ${player.id === activePlayerId ? 'players__elem--selected' : ''}`}
                    onClick={() => setActivePlayerId(player.id)}
                  >
                    {player.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="table">
          <div className="table__center">
            {!revealCardAbility && <div>Pick your cards!</div>}
            {revealCardAbility && (
              <div
                className="revealBtn"
                onClick={calcResult}
              >
                Reveal cards
              </div>
            )}
          </div>
          <div className="table__cards">
            {players.map((player, index) => (
              <div>
                <div key={index} className={`table__cards-elem ${getCardSateClass(player)}`}>{player.chosenCard}</div>
                <div>{player.name}</div>
              </div>
            ))}
          </div>
        </div>

        {activePlayer && (
          <div className="cards">
            {cardsMode[0].map((card, index) => (
              <div
                key={index} 
                className={`cards__elem ${card === activePlayer.chosenCard ? 'cards__elem--selected' : ''}`}
                onClick={() => setChosenCard(card)}
              >
                {card}
              </div>
            ))}
          </div>
        )}

        {result && (
          <div className="result">Average: {result || 0}</div>
        )}

        {isModalVisible && (
          <div className="overlap">
            <div className="modal">
              <div className="modal__close" onClick={() => setIsModalVisible(false)}></div>
              <div className="modal__title">Добавить игрока</div>
              <input type="text" placeholder='Введите имя игрока' value={name} onChange={(e) => setName(e.target.value)}/>
              <div className="modal__btn" onClick={() => addPlayer()}>Добавить</div>
            </div>
          </div>
        )}

      </div>
    </>
  )
}

export default App
