
/* 
    receives an array of past and current piece positions, current state of board and 
    counter, that will be used in future to sort taken moves from sessionStorage 
    (sessionStorage sorts keys by first symbol of a string)
 */
function moveNotation(moveArr, board, i) {
    const coordinatesTemplate = ['a', 'b', 'c', 'd', 'e', 'f', 'j', 'h'];

    const oldCol = coordinatesTemplate[moveArr[0][1]],
          oldRow = Number(moveArr[0][0]) + 1,
          currCol = coordinatesTemplate[moveArr[1][1]],
          currRow = Number(moveArr[1][0]) + 1;

    const pastMove = oldCol + oldRow;
    const currentMove = currCol + currRow;
    sessionStorage.setItem(`${i}. ${pastMove}-${currentMove}`, JSON.stringify(board));
    
}

export default moveNotation;