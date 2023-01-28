const checkPossibleMove = (parameterX, parameterY, board, axisX, axisY, reg) => {
    return board[axisX + parameterX] && board[axisY + parameterY] != undefined 
           && !reg.test(board[axisX + parameterX][axisY + parameterY].f);
}




export { checkPossibleMove };