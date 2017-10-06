class Game {
    constructor(numberOfRows, numberOfColumns, numberOfBombs) {
        this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
    }
    playMove(rowIndex, columnIndex) {
        this._board.flipTile(rowIndex, columnIndex);
        if(this._board.playerBoard[rowIndex][columnIndex] === 'B') {
            console.log('Game is over! Final board: ');
            this._board.print();
        } else if(Board.hasSafeTiles) {
            console.log('You win!');
        } else {
            console.log('Current board: ');
            this._board.print();
        }
    }
}
class Board {
    constructor(numberOfRows, numberOfColumns, numberOfBombs){
      this._numberOfBombs = numberOfBombs;
      this._numberOfTiless = numberOfColumns * numberOfRows;
      this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
      this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);    
    }
    get playerBoard(){
        return this._playerBoard;
    }
    flipTile (rowIndex, columnIndex) {
        if(this._playerBoard[rowIndex][columnIndex] !== ' ') {
            console.log('This tile already was flipped');
            return;
        } else if(this._playerBoard[rowIndex][columnIndex] == 'B') {
            this._playerBoard[rowIndex][columnIndex] = 'B';
        } else {
            this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
        }
        this._numberOfTiless--;
    }
    getNumberOfNeighborBombs(rowIndex, columnIndex) {
        const neighborOffsets = [
            [-1,-1],
            [-1,0],
            [-1,1],
            [0,-1],
            [0,1],
            [1,-1],
            [1,0],
            [1,1],
        ];
        const numberOfRows = this._bombBoard.length;
        const numberOfColumns = this._bombBoard[0].length;
        let numberOfBombs = 0;
        neighborOffsets.forEach(el  => {
            const neighborRowIndex = rowIndex + el[0];
            const neighborColumnIndex = columnIndex + el[1];
            if( neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
                if(this._bombBoard[neighborRowIndex][neighborColumnIndex] == 'B'){
                    numberOfBombs++;
                }
            }
        });
        return numberOfBombs;
    };
    hasSafeTiles() {
        return this._numberOfTiless !== this._numberOfBombs;
    }
    print() {
        console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
    }
    static generatePlayerBoard(numberOfRows, numberOfColumns) {
        let board = [];
        for(var i = 0; i < numberOfRows; i++) {
            let row = [];
            for(var k = 0; k < numberOfColumns; k++) {
                row.push(' ');
            }
            board.push(row);
        }
        return board;
    }
    static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
        let board = [];
        for(var i = 0; i < numberOfRows; i++) {
            let row = [];
            for(var k = 0; k < numberOfColumns; k++) {
                row.push(null);
            }
            board.push(row);
        }
        let numberOfBombsPlaced = 0;
        while(numberOfBombsPlaced < numberOfBombs) {
            let randomRowIndex = Math.floor(Math.random() * numberOfRows);
            let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
            if(board[randomRowIndex][randomColumnIndex] !== 'B'){
                board[randomRowIndex][randomColumnIndex] = 'B';
                numberOfBombsPlaced++;
            }
        }
    
        return board;
    }
}


const g = new Game(3,3,4);
g.playMove(1,0);


// let playerBoard = generateBombBoard(5, 5);
// let bombBoard = generateBombBoard(5, 5, 5);

// console.log('Player Board: ');
// printBoard(playerBoard);
// console.log('Bomb Board: ');
// printBoard(bombBoard);
// flipTile(playerBoard, bombBoard,3,3);
// console.log('Updated Player Board: ');
// printBoard(playerBoard);