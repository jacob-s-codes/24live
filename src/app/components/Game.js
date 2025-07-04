"use client";
import { useState, useEffect } from 'react'
import io from 'socket.io-client'

let socket

export default function Game() {
  const [gameState, setGameState] = useState('menu') // menu, waiting, playing, finished
  const [playerName, setPlayerName] = useState('')
  const [gameId, setGameId] = useState('')
  const [numbers, setNumbers] = useState([])
  const [expression, setExpression] = useState('')
  const [players, setPlayers] = useState([])
  const [winner, setWinner] = useState(null)
  const [error, setError] = useState('')
  const [gameTime, setGameTime] = useState(0)

  useEffect(() => {
    socketInitializer()
    return () => {
      if (socket) socket.disconnect()
    }
  }, [])

  const socketInitializer = async () => {
    await fetch('/api/socket')
    socket = io()

    socket.on('connect', () => {
      console.log('Connected to server')
    })

    socket.on('waiting', () => {
      setGameState('waiting')
    })

    socket.on('gameFound', (data) => {
      setGameId(data.gameId)
      setPlayers(data.players)
      setNumbers(data.numbers)
      setGameState('playing')
      setWinner(null)
      setError('')
    })

    socket.on('gameWon', (data) => {
      setWinner(data.winner)
      setGameTime(data.gameTime)
      setGameState('finished')
    })

    socket.on('invalidSolution', (data) => {
      setError(`Invalid solution: ${data.expression}`)
    })

    socket.on('newGame', (data) => {
      setNumbers(data.numbers)
      setGameState('playing')
      setWinner(null)
      setError('')
      setExpression('')
    })

    socket.on('playerDisconnected', (data) => {
      setError(`${data.playerName} disconnected`)
      setGameState('menu')
    })
  }

  const findGame = () => {
    if (!playerName.trim()) {
      setError('Please enter your name')
      return
    }
    socket.emit('findGame', playerName)
  }

  const submitSolution = () => {
    if (!expression.trim()) {
      setError('Please enter an expression')
      return
    }
    socket.emit('submitSolution', { gameId, expression })
  }

  const requestNewGame = () => {
    socket.emit('requestNewGame', { gameId })
  }

  const backToMenu = () => {
    setGameState('menu')
    setPlayerName('')
    setGameId('')
    setNumbers([])
    setExpression('')
    setPlayers([])
    setWinner(null)
    setError('')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Math 24 Game</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {gameState === 'menu' && (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter your name:
              </label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-300 text-black"
                placeholder="Your name"
                onKeyPress={(e) => e.key === 'Enter' && findGame()}
              />
            </div>
            <button
              onClick={findGame}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Find Game
            </button>
            <div className="mt-6 text-sm text-gray-600">
              <p className="font-semibold mb-2">How to play:</p>
              <p>Use the four numbers and basic operations (+, -, *, /) to make 24.</p>
              <p>Each number must be used exactly once.</p>
              <p>Example: 1 + 2 + 3 * 7 = 24</p>
            </div>
          </div>
        )}

        {gameState === 'waiting' && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-lg">Waiting for opponent...</p>
          </div>
        )}

        {gameState === 'playing' && (
          <div>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Players:</p>
              <div className="flex space-x-2">
                {players.map((player, index) => (
                  <span
                    key={player.id}
                    className={`px-3 py-1 rounded-full text-sm ${
                      player.id === socket.id
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {player.name} {player.id === socket.id && '(You)'}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-lg font-semibold mb-2 text-black">Use these numbers to make 24:</p>
              <div className="flex justify-center space-x-4 mb-4">
                {numbers.map((num, index) => (
                  <div
                    key={index}
                    className="w-12 h-12 bg-blue-500 text-white rounded-lg flex items-center justify-center text-xl font-bold"
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your solution:
              </label>
              <input
                type="text"
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-300 text-black"
                placeholder="e.g., 1 + 2 + 3 * 7"
                onKeyPress={(e) => e.key === 'Enter' && submitSolution()}
              />
            </div>
            
            <button
              onClick={submitSolution}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Submit Solution
            </button>
          </div>
        )}

        {gameState === 'finished' && (
          <div className="text-center">
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2">
                {winner === playerName ? '🎉 You Won!' : `${winner} Won!`}
              </h2>
              <p className="text-gray-600">
                Game completed in {Math.round(gameTime / 1000)} seconds
              </p>
            </div>
            
            <div className="space-y-2 mb-6">
              <button
                onClick={requestNewGame}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                New Round
              </button>
              <button
                onClick={backToMenu}
                className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Back to Menu
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}