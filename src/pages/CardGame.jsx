import { useState, useEffect } from 'react'

export default function CardGame() {
  const [deck, setDeck] = useState([])
  const [hand, setHand] = useState([])
  // ボード初期化：index 5（右上）は配列、他はnull
  const initializeBoard = () => {
    const newBoard = Array(11).fill(null)
    newBoard[5] = [] // 右上のマスは複数カード可能
    return newBoard
  }
  const [board, setBoard] = useState(initializeBoard()) // 2x6-1 = 11マス（右下はデッキ）
  const [draggedCard, setDraggedCard] = useState(null)
  const [draggedFromIndex, setDraggedFromIndex] = useState(null)
  const [draggedFromLocation, setDraggedFromLocation] = useState(null) // 'hand' or 'board'

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
    setBoard(initializeBoard())
  }

  // ドラッグ開始（手札から）
  const handleDragStart = (e, card, fromIndex) => {
    setDraggedCard(card)
    setDraggedFromIndex(fromIndex)
    setDraggedFromLocation('hand')
    e.dataTransfer.effectAllowed = 'move'
  }

  // ドラッグ開始（ボードから）
  const handleBoardDragStart = (e, card, fromIndex) => {
    // index 5（右上）からはドラッグ禁止
    if (fromIndex === 5) {
      e.preventDefault()
      return
    }
    setDraggedCard(card)
    setDraggedFromIndex(fromIndex)
    setDraggedFromLocation('board')
    e.dataTransfer.effectAllowed = 'move'
  }

  // ドラッグオーバー
  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  // ドロップ
  const handleDrop = (e, boardIndex) => {
    e.preventDefault()
    
    if (draggedCard) {
      const newBoard = [...board]
      
      // index 5（右上）は複数カード可能
      if (boardIndex === 5) {
        newBoard[5] = [...newBoard[5], draggedCard]
        setBoard(newBoard)
        
        if (draggedFromLocation === 'hand') {
          const newHand = hand.filter((_, index) => index !== draggedFromIndex)
          setHand(newHand)
        } else if (draggedFromLocation === 'board' && draggedFromIndex !== 5) {
          newBoard[draggedFromIndex] = null
          setBoard(newBoard)
        }
      } else if (board[boardIndex] === null) {
        // 他のマスは1枚のみ
        newBoard[boardIndex] = draggedCard
        setBoard(newBoard)
        
        if (draggedFromLocation === 'hand') {
          const newHand = hand.filter((_, index) => index !== draggedFromIndex)
          setHand(newHand)
        } else if (draggedFromLocation === 'board') {
          if (draggedFromIndex === 5) {
            // 右上から移動する場合は一番上のカードを削除
            newBoard[5] = newBoard[5].slice(0, -1)
          } else {
            newBoard[draggedFromIndex] = null
          }
          setBoard(newBoard)
        }
      }
    }
    
    setDraggedCard(null)
    setDraggedFromIndex(null)
    setDraggedFromLocation(null)
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">

      <div className="flex justify-center mb-4">
        <button onClick={resetGame} className="px-6 py-3 text-base rounded-lg bg-red-500 text-white cursor-pointer transition-colors hover:bg-red-600">
          ゲームをリセット
        </button>
      </div>


      <div className="mb-20">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-6 gap-4">
          {board.map((card, index) => (
            <div
              key={index}
              className="w-24 h-36 border-2 border-gray-400 border-dashed rounded-lg flex items-center justify-center bg-gray-50 transition-colors hover:bg-gray-100"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              {index === 5 ? (
                // 右上のマス（複数カード可能）
                Array.isArray(board[5]) && board[5].length > 0 ? (
                  <div className="w-20 h-32 border-2 border-gray-800 rounded-lg flex items-center justify-center text-2xl font-bold bg-white shadow-md">
                    <span>{board[5][board[5].length - 1]}</span>
                  </div>
                ) : (
                  <span className="text-gray-400">空</span>
                )
              ) : (
                // 他のマス（1枚のみ）
                card ? (
                  <div 
                    draggable
                    onDragStart={(e) => handleBoardDragStart(e, card, index)}
                    className="w-20 h-32 border-2 border-gray-800 rounded-lg flex items-center justify-center text-2xl font-bold bg-white shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg cursor-move"
                  >
                    <span>{card}</span>
                  </div>
                ) : (
                  <span className="text-gray-400">空</span>
                )
              )}
            </div>
          ))}
          
          {/* デッキを右下（6列目）に配置 */}
          <div className="w-24 h-36 flex items-center justify-center">
            {deck.length > 0 ? (
              <div 
                onClick={drawCard}
                className="w-20 h-32 border-2 border-gray-800 rounded-lg flex items-center justify-center text-2xl font-bold bg-gray-800 text-white shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg cursor-pointer"
              >
                <span>{deck.length}</span>
              </div>
            ) : (
              <div className="w-20 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-xl">空</div>
            )}
          </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex flex-wrap gap-4 justify-center min-h-32">
          {hand.map((card, index) => (
            <div
              key={index}
              draggable
              onDragStart={(e) => handleDragStart(e, card, index)}
              className="w-20 h-32 border-2 border-gray-800 rounded-lg flex items-center justify-center text-2xl font-bold bg-white shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg cursor-move"
            >
              <span>{card}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}