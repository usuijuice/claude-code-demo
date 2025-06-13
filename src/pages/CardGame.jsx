import { useState, useEffect } from 'react'
import '../styles/CardGame.css'

export default function CardGame() {
  const [deck, setDeck] = useState([])
  const [hand, setHand] = useState([])

  // デッキを初期化（1-40のカードをシャッフル）
  useEffect(() => {
    const initializeDeck = () => {
      const newDeck = Array.from({ length: 40 }, (_, i) => i + 1)
      // Fisher-Yatesシャッフルアルゴリズム
      for (let i = newDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]]
      }
      setDeck(newDeck)
    }
    initializeDeck()
  }, [])

  // カードを引く
  const drawCard = () => {
    if (deck.length === 0) {
      alert('デッキにカードがありません！')
      return
    }

    const newDeck = [...deck]
    const drawnCard = newDeck.pop()
    setDeck(newDeck)
    setHand([...hand, drawnCard])
  }

  // ゲームをリセット
  const resetGame = () => {
    const newDeck = Array.from({ length: 40 }, (_, i) => i + 1)
    for (let i = newDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]]
    }
    setDeck(newDeck)
    setHand([])
  }

  return (
    <div className="card-game">
      <h1>カードゲーム</h1>
      
      <div className="game-info">
        <p>デッキの残り枚数: {deck.length}枚</p>
        <p>手札の枚数: {hand.length}枚</p>
      </div>

      <div className="game-controls">
        <button onClick={drawCard} disabled={deck.length === 0}>
          カードを引く
        </button>
        <button onClick={resetGame}>
          ゲームをリセット
        </button>
      </div>

      <div className="deck-section">
        <h2>デッキ</h2>
        <div className="deck">
          {deck.length > 0 ? (
            <div className="card card-back">
              <span>?</span>
            </div>
          ) : (
            <div className="empty-deck">空</div>
          )}
        </div>
      </div>

      <div className="hand-section">
        <h2>手札</h2>
        <div className="hand">
          {hand.map((card, index) => (
            <div key={index} className="card">
              <span>{card}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}