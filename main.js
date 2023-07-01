const board = document.getElementById('chessboard');
const squareSize = 50;
const boardSize = 700;

board.style.width = boardSize + "px";
board.style.height = boardSize + "px";

const squaresInARow = (boardSize / squareSize);
const directions = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [-1, 1], [1, -1]];

function toggleState() {
    this.className = (this.className === "square dead") ? "square alive" : "square dead";
}

// initialize the board
for (let i = 0; i < boardSize / squareSize; ++i) {
    for (let j = 0; j < boardSize / squareSize; ++j) {
        let square = document.createElement('div');
        square.className = 'square dead';

        square.style.width = (squareSize - 2) + "px";
        square.style.height = (squareSize - 2) + "px";
        square.style.border = "1px solid white";
        square.style.float = "left";

        square.addEventListener("click", toggleState);
        
        board.appendChild(square);
    }
}


const clearBoard = (squares) => {
    for (let i = 0; i < squares.length; ++i) {
        squares[i].className = "square dead";
    }
}

let intervalId;
const gameLoop = () => {
    aliveCells = []
    const squares = document.getElementsByClassName('square');
    for (let i = 0; i < squaresInARow; ++i) {
        for (let j = 0; j < squaresInARow; ++j) {
            let aliveNeighbours = 0;
            let num = i * squaresInARow + j;
            const square = squares[num];

            for (let k = 0; k < directions.length; ++k) {
                let dx = i + directions[k][0];
                let dy = j + directions[k][1];

                if (dx >= 0 && dy >= 0 && dx < squaresInARow && dy < squaresInARow &&
                    squares[dx * squaresInARow + dy].className === "square alive")
                {
                    aliveNeighbours += 1;
                }
            }

            if (square.className === "square alive") {
                if (aliveNeighbours === 2 || aliveNeighbours === 3)
                    aliveCells.push(num);
            }
            else {
                if (aliveNeighbours === 3)
                    aliveCells.push(num);
            }
        }
    }

    clearBoard(squares);

    for (let i = 0; i < aliveCells.length; ++i) {
        squares[aliveCells[i]].className = "square alive";
    }
}

const toggleButton = document.getElementById('toggle');
toggleButton.addEventListener("click", () => {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
        toggleButton.textContent = "start";
    }
    else {
        intervalId = setInterval(gameLoop, 500);
        toggleButton.textContent = "stop";
    }
});

const clearButton = document.getElementById('clear');
clearButton.addEventListener("click", () => {
    const squares = document.getElementsByClassName('square');
    clearBoard(squares);
});