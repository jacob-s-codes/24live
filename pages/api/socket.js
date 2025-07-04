import { Server } from 'socket.io';

const games = new Map();
const players = []

function getValidNums() {
    let nums = [1, 1, 1, 1]
    while (!canMake24(nums)) {
        nums = Array.from({ length: 4 }, () => Math.floor(Math.random() * 13) + 1);
    }
    return nums;
}

function createGame(player1, player2) {
    const gameId = Math.random().toString(36).substr(2, 9);
    const numbers = getValidNums();

    const game = {
        id: gameId,
        players: [player1, player2],
        numbers: numbers,
        solutions: [],
        winner: null,
        status: 'playing',
        startTime: Date.now()
    }

    games.set(gameId, game);
    return game;
}

function canMake24(nums) {
    const EPSILON = 1e-6;

    // Use a Set to store processed arrays to avoid redundant calculations
    // (though for 24 game with 4 numbers, this might be overkill and still slow)
    // A better approach is to not generate redundant subproblems in the first place.

    function helper(arr) {
        if (arr.length === 0) return false; // Should not happen with initial call
        if (arr.length === 1) return Math.abs(arr[0] - 24) < EPSILON;

        // Iterate through all unique pairs (i, j)
        // To avoid processing (a, b) and then (b, a) as separate initial pairs,
        // ensure i < j to pick distinct pairs only once.
        for (let i = 0; i < arr.length; i++) {
            for (let j = i + 1; j < arr.length; j++) { // Start j from i + 1
                const rest = [];
                for (let k = 0; k < arr.length; k++) {
                    if (k !== i && k !== j) rest.push(arr[k]);
                }

                const a = arr[i], b = arr[j];

                // Operations: a+b, a-b, b-a, a*b, a/b, b/a
                // Note: (a+b) is same as (b+a). (a*b) is same as (b*a).
                // Subtraction and division are not commutative.
                const nextValues = [];
                nextValues.push(a + b);
                nextValues.push(a - b);
                nextValues.push(b - a);
                nextValues.push(a * b);

                if (Math.abs(b) > EPSILON) nextValues.push(a / b);
                if (Math.abs(a) > EPSILON) nextValues.push(b / a);

                for (const val of nextValues) {
                    if (helper([...rest, val])) return true;
                }
            }
        }

        return false;
    }

    // Initial call to helper with the input numbers
    return helper(nums);
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
        game.numbers = getValidNums()
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