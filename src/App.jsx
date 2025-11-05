import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)
  const [gameMode, setGameMode] = useState('pvp') // 'pvp', 'pvc', 'cvc'
  const [difficulty, setDifficulty] = useState('medium') // 'easy', 'medium', 'hard'
  const [gameStatus, setGameStatus] = useState('playing') // 'playing', 'won', 'draw'
  const [winner, setWinner] = useState(null)
  const [winningLine, setWinningLine] = useState([])
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 })
  const [showSettings, setShowSettings] = useState(true)
  const [autoPlaySpeed, setAutoPlaySpeed] = useState(1000)
  const [isThinking, setIsThinking] = useState(false)

  // Calculate winner
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ]
    
    for (let line of lines) {
      const [a, b, c] = line
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line }
      }
    }
    return null
  }

  // Check for draw
  const isDraw = (squares) => {
    return squares.every(square => square !== null) && !calculateWinner(squares)
  }

  // AI Move - Easy (Random)
  const getRandomMove = (squares) => {
    const availableMoves = squares
      .map((square, index) => square === null ? index : null)
      .filter(val => val !== null)
    return availableMoves[Math.floor(Math.random() * availableMoves.length)]
  }

  // AI Move - Medium (Mix of random and strategic)
  const getMediumMove = (squares) => {
    // 50% chance to use minimax, 50% random
    if (Math.random() > 0.5) {
      return getHardMove(squares)
    }
    return getRandomMove(squares)
  }

  // AI Move - Hard (Minimax algorithm)
  const getHardMove = (squares) => {
    const minimax = (board, depth, isMaximizing) => {
      const result = calculateWinner(board)
      
      if (result) {
        return result.winner === 'O' ? 10 - depth : depth - 10
      }
      
      if (board.every(square => square !== null)) {
        return 0
      }

      if (isMaximizing) {
        let bestScore = -Infinity
        for (let i = 0; i < 9; i++) {
          if (board[i] === null) {
            board[i] = 'O'
            const score = minimax(board, depth + 1, false)
            board[i] = null
            bestScore = Math.max(score, bestScore)
          }
        }
        return bestScore
      } else {
        let bestScore = Infinity
        for (let i = 0; i < 9; i++) {
          if (board[i] === null) {
            board[i] = 'X'
            const score = minimax(board, depth + 1, true)
            board[i] = null
            bestScore = Math.min(score, bestScore)
          }
        }
        return bestScore
      }
    }

    let bestScore = -Infinity
    let bestMove = null
    const boardCopy = [...squares]

    for (let i = 0; i < 9; i++) {
      if (boardCopy[i] === null) {
        boardCopy[i] = 'O'
        const score = minimax(boardCopy, 0, false)
        boardCopy[i] = null
        if (score > bestScore) {
          bestScore = score
          bestMove = i
        }
      }
    }

    return bestMove
  }

  // Get AI move based on difficulty
  const getAIMove = (squares) => {
    switch (difficulty) {
      case 'easy':
        return getRandomMove(squares)
      case 'medium':
        return getMediumMove(squares)
      case 'hard':
        return getHardMove(squares)
      default:
        return getRandomMove(squares)
    }
  }

  // Handle click
  const handleClick = (index) => {
    if (board[index] || gameStatus !== 'playing' || isThinking) return
    
    // Only allow human clicks in PvP or when it's X's turn in PvC
    if (gameMode === 'pvc' && !isXNext) return
    if (gameMode === 'cvc') return

    makeMove(index)
  }

  // Make a move
  const makeMove = (index) => {
    const newBoard = [...board]
    newBoard[index] = isXNext ? 'X' : 'O'
    setBoard(newBoard)
    setIsXNext(!isXNext)

    const result = calculateWinner(newBoard)
    if (result) {
      setWinner(result.winner)
      setWinningLine(result.line)
      setGameStatus('won')
      setScores(prev => ({ ...prev, [result.winner]: prev[result.winner] + 1 }))
    } else if (isDraw(newBoard)) {
      setGameStatus('draw')
      setScores(prev => ({ ...prev, draws: prev.draws + 1 }))
    }
  }

  // Computer move effect
  useEffect(() => {
    if (gameStatus !== 'playing') return

    const shouldComputerMove = 
      (gameMode === 'pvc' && !isXNext) || 
      (gameMode === 'cvc')

    if (shouldComputerMove) {
      setIsThinking(true)
      const delay = gameMode === 'cvc' ? autoPlaySpeed : 500
      
      const timer = setTimeout(() => {
        const move = getAIMove(board)
        if (move !== null && move !== undefined) {
          makeMove(move)
        }
        setIsThinking(false)
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [isXNext, gameStatus, gameMode, board])

  // Reset game
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
    setGameStatus('playing')
    setWinner(null)
    setWinningLine([])
  }

  // Reset scores
  const resetScores = () => {
    setScores({ X: 0, O: 0, draws: 0 })
  }

  // Start new game
  const startNewGame = () => {
    setShowSettings(false)
    resetGame()
  }

  // Render square
  const renderSquare = (index) => {
    const isWinningSquare = winningLine.includes(index)
    const value = board[index]
    
    return (
      <button
        key={index}
        className={`square ${value ? 'filled' : ''} ${isWinningSquare ? 'winning' : ''} ${isThinking && gameMode !== 'pvp' ? 'disabled' : ''}`}
        onClick={() => handleClick(index)}
      >
        {value && <span className={`symbol ${value.toLowerCase()}`}>{value}</span>}
      </button>
    )
  }

  if (showSettings) {
    return (
      <div className="app-container">
        <div className="settings-panel">
          <h1 className="game-title">🎮 Tic Tac Toe</h1>
          
          <div className="setting-group">
            <h2>Game Mode</h2>
            <div className="button-group">
              <button
                className={`mode-btn ${gameMode === 'pvp' ? 'active' : ''}`}
                onClick={() => setGameMode('pvp')}
              >
                👥 Player vs Player
              </button>
              <button
                className={`mode-btn ${gameMode === 'pvc' ? 'active' : ''}`}
                onClick={() => setGameMode('pvc')}
              >
                🤖 Player vs Computer
              </button>
              <button
                className={`mode-btn ${gameMode === 'cvc' ? 'active' : ''}`}
                onClick={() => setGameMode('cvc')}
              >
                🤖🤖 Computer vs Computer
              </button>
            </div>
          </div>

          {(gameMode === 'pvc' || gameMode === 'cvc') && (
            <div className="setting-group">
              <h2>Difficulty</h2>
              <div className="button-group">
                <button
                  className={`difficulty-btn easy ${difficulty === 'easy' ? 'active' : ''}`}
                  onClick={() => setDifficulty('easy')}
                >
                  😊 Easy
                </button>
                <button
                  className={`difficulty-btn medium ${difficulty === 'medium' ? 'active' : ''}`}
                  onClick={() => setDifficulty('medium')}
                >
                  😐 Medium
                </button>
                <button
                  className={`difficulty-btn hard ${difficulty === 'hard' ? 'active' : ''}`}
                  onClick={() => setDifficulty('hard')}
                >
                  😈 Hard
                </button>
              </div>
            </div>
          )}

          {gameMode === 'cvc' && (
            <div className="setting-group">
              <h2>Auto-play Speed</h2>
              <div className="speed-control">
                <input
                  type="range"
                  min="200"
                  max="2000"
                  step="100"
                  value={autoPlaySpeed}
                  onChange={(e) => setAutoPlaySpeed(Number(e.target.value))}
                  className="speed-slider"
                />
                <span className="speed-label">{autoPlaySpeed}ms</span>
              </div>
            </div>
          )}

          <button className="start-btn" onClick={startNewGame}>
            Start Game
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="app-container">
      <div className="game-container">
        <h1 className="game-title">🎮 Tic Tac Toe</h1>
        
        <div className="game-info">
          <div className="status">
            {gameStatus === 'playing' && (
              <span className={isThinking ? 'thinking' : ''}>
                {isThinking ? '🤔 Computer thinking...' : `${isXNext ? 'X' : 'O'}'s turn`}
              </span>
            )}
            {gameStatus === 'won' && (
              <span className="winner-announcement">
                🎉 {winner} wins!
              </span>
            )}
            {gameStatus === 'draw' && (
              <span className="draw-announcement">
                🤝 It's a draw!
              </span>
            )}
          </div>
          
          <div className="scores">
            <div className="score-item x">X: {scores.X}</div>
            <div className="score-item draw">Draws: {scores.draws}</div>
            <div className="score-item o">O: {scores.O}</div>
          </div>
        </div>

        <div className="board">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(renderSquare)}
        </div>

        <div className="controls">
          <button className="control-btn reset" onClick={resetGame}>
            🔄 New Game
          </button>
          <button className="control-btn settings" onClick={() => setShowSettings(true)}>
            ⚙️ Settings
          </button>
          <button className="control-btn clear" onClick={resetScores}>
            🗑️ Clear Scores
          </button>
        </div>

        <div className="game-mode-indicator">
          Mode: {gameMode === 'pvp' ? 'Player vs Player' : gameMode === 'pvc' ? 'Player vs Computer' : 'Computer vs Computer'}
          {(gameMode === 'pvc' || gameMode === 'cvc') && ` (${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)})`}
        </div>
      </div>
    </div>
  )
}

export default App
