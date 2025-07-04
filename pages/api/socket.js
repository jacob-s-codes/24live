// pages/api/socket.js
import { Server } from 'socket.io'

const games = new Map() // Store active games
const waitingPlayers = [] // Players waiting for a game

function generateNumbers() {
  return Array.from({ length: 4 }, () => Math.floor(Math.random() * 13) + 1)
}

function createGame(player1, player2) {
  const gameId = Math.random().toString(36).substr(2, 9)
  const numbers = generateNumbers()
  
  const game = {
    id: gameId,
    players: [player1, player2],
    numbers: numbers,
    solutions: [],
    winner: null,
    status: 'playing',
    startTime: Date.now()
  }
  
  games.set(gameId, game)
  return game
}

function isValidSolution(numbers, expression) {
  try {
    // Basic validation - ensure only allowed numbers and operators
    const allowedChars = /^[0-9+\-*/().\s]+$/
    if (!allowedChars.test(expression)) return false
    
    // Check if all numbers are used exactly once
    const usedNumbers = expression.match(/\d+/g) || []
    if (usedNumbers.length !== 4) return false
    
    const sortedUsed = usedNumbers.map(n => parseInt(n)).sort()
    const sortedOriginal = [...numbers].sort()
    
    if (JSON.stringify(sortedUsed) !== JSON.stringify(sortedOriginal)) {
      return false
    }
    
    // Evaluate the expression
    const result = Function('"use strict"; return (' + expression + ')')()
    return Math.abs(result - 24) < 0.0001
  } catch (error) {
    return false
  }
}

export default function handler(req, res) {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connection', (socket) => {
      console.log('User connected:', socket.id)

      socket.on('findGame', (playerName) => {
        const player = { id: socket.id, name: playerName, socket }
        
        if (waitingPlayers.length > 0) {
          // Match with waiting player
          const opponent = waitingPlayers.shift()
          const game = createGame(player, opponent)
          
          // Join both players to the game room
          socket.join(game.id)
          opponent.socket.join(game.id)
          
          // Notify both players
          io.to(game.id).emit('gameFound', {
            gameId: game.id,
            players: game.players.map(p => ({ id: p.id, name: p.name })),
            numbers: game.numbers
          })
        } else {
          // Add to waiting list
          waitingPlayers.push(player)
          socket.emit('waiting')
        }
      })

      socket.on('submitSolution', ({ gameId, expression }) => {
        const game = games.get(gameId)
        if (!game || game.status !== 'playing') return

        const player = game.players.find(p => p.id === socket.id)
        if (!player) return

        if (isValidSolution(game.numbers, expression)) {
          game.winner = player
          game.status = 'finished'
          game.solutions.push({ player: player.name, expression, time: Date.now() })
          
          io.to(gameId).emit('gameWon', {
            winner: player.name,
            solution: expression,
            gameTime: Date.now() - game.startTime
          })
        } else {
          socket.emit('invalidSolution', { expression })
        }
      })

      socket.on('requestNewGame', ({ gameId }) => {
        const game = games.get(gameId)
        if (!game) return

        // Generate new numbers
        game.numbers = generateNumbers()
        game.status = 'playing'
        game.winner = null
        game.solutions = []
        game.startTime = Date.now()

        io.to(gameId).emit('newGame', {
          numbers: game.numbers
        })
      })

      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id)
        
        // Remove from waiting list
        const waitingIndex = waitingPlayers.findIndex(p => p.id === socket.id)
        if (waitingIndex !== -1) {
          waitingPlayers.splice(waitingIndex, 1)
        }
        
        // Handle game disconnection
        for (const [gameId, game] of games.entries()) {
          const playerIndex = game.players.findIndex(p => p.id === socket.id)
          if (playerIndex !== -1) {
            socket.to(gameId).emit('playerDisconnected', {
              playerName: game.players[playerIndex].name
            })
            games.delete(gameId)
          }
        }
      })
    })
  }
  res.end()
}