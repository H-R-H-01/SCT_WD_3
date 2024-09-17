import React, { useState, useEffect } from 'react';


const checkWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};


const getComputerMove = (squares) => {
  const emptySquares = squares.map((val, index) => (val === null ? index : null)).filter(val => val !== null);
  return emptySquares[Math.floor(Math.random() * emptySquares.length)];
};

const TicTacToe = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [mode, setMode] = useState(null);
  const [winner, setWinner] = useState(null);


  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

 
  const handleModeSelect = (selectedMode) => {
    setMode(selectedMode);
    resetGame();
  };


  const handleClick = (i) => {
    if (squares[i] || winner) return;

    const newSquares = squares.slice();
    newSquares[i] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);

    const currentWinner = checkWinner(newSquares);
    setWinner(currentWinner);

    if (mode === 'vsComputer' && !currentWinner) {
      setTimeout(() => {
        const computerMove = getComputerMove(newSquares);
        if (computerMove !== undefined) {
          newSquares[computerMove] = 'O';
          setSquares(newSquares);
          setIsXNext(true);
          const winnerAfterComputerMove = checkWinner(newSquares);
          setWinner(winnerAfterComputerMove);
        }
      }, 200)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-neon-green">
      
      {mode === null ? (
        <div className="flex flex-col items-center space-y-4 justify-center">
          <h1 className='text-white text-3xl'>Task 3</h1>
          <h1 className="text-white text-5xl mb-[5vh]">Tic-Tac-Toe</h1>
          <button
            className="px-8 py-4 bg-neon-green text-gray-400 text-2xl rounded shadow-neon hover:bg-green-400 hover:text-black"
            onClick={() => handleModeSelect('twoPlayer')}
          >
            Two Player
          </button>
          <button
            className="px-8 py-4 bg-neon-green text-gray-400 text-2xl rounded shadow-neon hover:bg-green-400 hover:text-black"
            onClick={() => handleModeSelect('vsComputer')}
          >
            Player vs Computer
          </button>
        </div>
      ) : (
        <div className=' flex justify-center items-center flex-col'>
          <div className=" text-6xl mb-4 text-green-300">
            {winner ? 
            <Winner1 
            winner={winner} 
            resetGame = {resetGame}/> : 
            `Next Player: ${isXNext ? 'X' : 'O'}`}
          </div>
          
          <div className="grid grid-cols-3 gap-6">
            {squares.map((square, i) => (
              <button
                key={i}
                className="w-24 h-24 bg-gray-900 text-5xl text-orange-400 flex items-center justify-center border-4 border-neon-green hover:bg-gray-700"
                onClick={() => handleClick(i)}
              >
                {square}
              </button>
              
            ))}
          </div>
          
          <button
            className="mt-8 px-4 py-2 text-gray-400 text-2xl rounded shadow-neon hover:bg-green-400 hover:text-black"
            onClick={resetGame}
          >
            Reset Game
          </button>
        </div>
      )}      
    </div>
  );
};

const Winner1 = ({winner,resetGame}) => {
  return(
    <div className='absolute top-[20%] left-[37%] h-[50vh] w-[55vh] bg-orange-300 rounded-lg border border-black shadow-orange-400 shadow-lg  text-5xl text-black flex flex-col justify-center items-center gap-8'>
      <h1>'{winner}' won !</h1>
      <button
      className='text-red-600 p-[10px] border-transparent'
      onClick={resetGame}>
        Try again?</button>
    </div>
  )
}

export default TicTacToe;
