function pawn(item, xy, board) {
    let possibleMovement = [];
    const axisX = Number(xy[0]);
    const axisY = Number(xy[1]);

    /* хід через 1 клітинку */
    if (item === 'P' && axisX === 1 && board[axisX + 1][axisY].f === "" && board[axisX + 2][axisY].f === "") {
        possibleMovement.push(`${axisX + 2}${axisY}`);
    } else if (item === 'p' && axisX === 6 && board[axisX - 1][axisY].f === "" && board[axisX - 2][axisY].f === "") {
        possibleMovement.push(`${axisX - 2}${axisY}`);
    }

    /* перевірка на можливість нанесення удару */
    function attackMove(pieceName, parameterX, parameterY, reg) {
        return item === pieceName 
            && board[axisX + parameterX][axisY + parameterY] != undefined 
            && reg.test(board[axisX + parameterX][axisY + parameterY].f);
    }

    if (attackMove('P', 1, 1, /[a-z]/)) possibleMovement.push(`${axisX + 1}${axisY + 1}`); 
    if (attackMove('P', 1, -1, /[a-z]/)) possibleMovement.push(`${axisX + 1}${axisY - 1}`);

    if (attackMove('p', -1, 1, /[A-Z]/)) possibleMovement.push(`${axisX - 1}${axisY + 1}`);
    if (attackMove('p', -1, -1, /[A-Z]/)) possibleMovement.push(`${axisX - 1}${axisY - 1}`);

    /* хід на 1 клітинку */ 
    /* перевірка на перешкоду попереду */
    function checkPossibleBarrier(parameterX) {
        if (board[axisX + parameterX][axisY].f != "") {
            possibleMovement = possibleMovement.filter(item => item != `${axisX + parameterX}${axisY}`);
        }
        return possibleMovement;
    }

    if (item === 'P') {
        possibleMovement.push(`${axisX + 1}${axisY}`);
        possibleMovement = checkPossibleBarrier(1);
    } else if (item === 'p') {
        possibleMovement.push(`${axisX - 1}${axisY}`);
        possibleMovement = checkPossibleBarrier(-1);
    }

    return possibleMovement
}

export default pawn;