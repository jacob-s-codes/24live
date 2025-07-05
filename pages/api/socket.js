// pages/api/socket.js
import { Server } from 'socket.io';

const games = new Map();
const waitingPlayers = [];

// Generate random numbers for the game
function getValidNums() {
  const numbers = [];
  for (let i = 0; i < 4; i++) {
    numbers.push(Math.floor(Math.random() * 13) + 1);
  }
  return numbers;
}

// Create a new game
function createGame(player1, player2) {
  const gameId = Math.random().toString(36).substring(2, 15);
  const numbers = getValidNums();
  
  const game = {
    id: gameId,
    players: [player1, player2],
    numbers: numbers,
    startTime: Date.now(),
    finished: false
  };
  
  games.set(gameId, game);
  return game;
}

// Check if numbers can make 24 (simple validation)
function canMake24(numbers, expression) {
  try {
    // Basic validation - check if all numbers are used
    const usedNumbers = expression.match(/\d+/g);
    if (!usedNumbers || usedNumbers.length !== 4) {
      return false;
    }
    
    // Check if all provided numbers are used
    const sortedProvided = [...numbers].sort();
    const sortedUsed = usedNumbers.map(Number).sort();
    
    if (JSON.stringify(sortedProvided) !== JSON.stringify(sortedUsed)) {
      return false;
    }
    
    // Evaluate the expression
    const result = eval(expression);
    return Math.abs(result - 24) < 0.001; // Handle floating point precision
  } catch (error) {
    return false;
  }
}

export default function handler(req, res) {
  if (res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    const io = new Server(res.socket.server, {
      cors: {
        origin: process.env.NODE_ENV === 'production' ? false : '*',
      },
    });
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      console.log('User connected:', socket.id);

      socket.on('findGame', (playerData) => {
        const player = { 
          id: socket.id, 
          name: playerData.name || playerData,
          socket 
        };
        
        if (waitingPlayers.length > 0) {
          const opponent = waitingPlayers.shift();
          const game = createGame(player, opponent);
          
          socket.join(game.id);
          opponent.socket.join(game.id);
          
          io.to(game.id).emit('gameFound', {
            gameId: game.id,
            players: game.players.map(p => ({ 
              id: p.id, 
              name: p.name
            })),
            numbers: game.numbers
          });
        } else {
          waitingPlayers.push(player);
          socket.emit('waiting');
        }
      });

      socket.on('submitSolution', (data) => {
        const game = games.get(data.gameId);
        if (!game || game.finished) return;

        const player = game.players.find(p => p.id === socket.id);
        if (!player) return;

        if (canMake24(game.numbers, data.expression)) {
          game.finished = true;
          const gameTime = Date.now() - game.startTime;
          
          io.to(game.id).emit('gameWon', {
            winner: player.name,
            gameTime: gameTime,
            expression: data.expression
          });
        } else {
          socket.emit('invalidSolution', {
            expression: data.expression
          });
        }
      });

      socket.on('requestNewGame', (data) => {
        const game = games.get(data.gameId);
        if (!game) return;

        const player = game.players.find(p => p.id === socket.id);
        if (!player) return;

        // Generate new numbers
        game.numbers = getValidNums();
        game.startTime = Date.now();
        game.finished = false;

        io.to(game.id).emit('newGame', {
          numbers: game.numbers
        });
      });

      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        
        // Remove from waiting players
        const waitingIndex = waitingPlayers.findIndex(p => p.id === socket.id);
        if (waitingIndex > -1) {
          waitingPlayers.splice(waitingIndex, 1);
        }

        // Handle game disconnection
        for (const [gameId, game] of games.entries()) {
          const player = game.players.find(p => p.id === socket.id);
          if (player) {
            const opponent = game.players.find(p => p.id !== socket.id);
            if (opponent) {
              opponent.socket.emit('playerDisconnected', {
                playerName: player.name
              });
            }
            games.delete(gameId);
            break;
          }
        }
      });
    });
  }
  res.end();
}