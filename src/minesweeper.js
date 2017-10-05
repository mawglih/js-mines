const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
    let board = [];
    for(var i = 0; i < numberOfRows; i++) {
        let row = [];
        for(var k = 0; k < numberOfColumns; k++) {
            row.push(' ');
        }
        board.push(row);
    }
    return board;
};
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
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
};
const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
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
    const numberOfRows = bombBoard.length;
    const numberOfColumns = bombBoard[0].length;
    let numberOfBombs = 0;
    neighborOffsets.forEach(el  => {
        const neighborRowIndex = rowIndex + el[0];
        const neighborColumnIndex = columnIndex + el[1];
        if( neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
            if(bombBoard[neighborRowIndex][neighborColumnIndex] === 'B'){
                numberOfBombs++;
            }
        }
    });
    return numberOfBombs;
}
const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
    if(playerBoard[rowIndex][columnIndex] === 'B') {
        console.log('This tile already was flipped');
        return;
    } else if(playerBoard[rowIndex][columnIndex] !== '') {
        playerBoard[rowIndex][columnIndex] = 'B';
    } else {
        playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
    }

}
const printBoard = board =>{
    console.log(board.map(row => row.join(' | ')).join('\n'));
};

let playerBoard = generateBombBoard(3, 4);
let bombBoard = generateBombBoard(3, 4, 5);

console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);
flipTile(playerBoard, bombBoard,1,1);
console.log('Updated Player Board: ');
printBoard(playerBoard);