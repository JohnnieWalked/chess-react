function pawn(item, xy, board) {
    let possibleMovement = [];
    const axisX = Number(xy[0]);
    const axisY = Number(xy[1]);

    /* move on 2 squares */
    if (item === 'P' && axisX === 1 && board[axisX + 1][axisY].f === "" && board[axisX + 2][axisY].f === "") {
        possibleMovement.push(`${axisX + 2}${axisY}`);
    } else if (item === 'p' && axisX === 6 && board[axisX - 1][axisY].f === "" && board[axisX - 2][axisY].f === "") {
        possibleMovement.push(`${axisX - 2}${axisY}`);
    }

    /* check for attack move */
    function attackMove(shiftX, shiftY, reg) {
        if (board[axisX + shiftX][axisY + shiftY] != undefined 
            && reg.test(board[axisX + shiftX][axisY + shiftY].f)) {

                /* 
                part of isCheck() logic. if a king can hit an enemy pawn diagonally - returns 'true', 
                which means the check.
                */
                if (item === "K" && /[p]/.test(board[axisX + shiftX][axisY + shiftY].f)) {
                   possibleMovement.push(true);
                } else if (item === "k" && /[P]/.test(board[axisX + shiftX][axisY + shiftY].f)) {
                    possibleMovement.push(true);
                }
                
                else {
                    possibleMovement.push(`${axisX + shiftX}${axisY + shiftY}`);
                }
        }
    }

    if (item === "P" || item === "K") {
        attackMove(1, 1, /[a-z]/); 
        attackMove(1, -1, /[a-z]/);
    } else if (item === "p" || item === "k") {
        attackMove(-1, 1, /[A-Z]/);
        attackMove(-1, -1, /[A-Z]/);
    }

    /* move on 1 square */ 
    /* check for barrier ahead */
    function checkPossibleBarrier(shiftX) {
        if (board[axisX + shiftX][axisY].f != "") {
            possibleMovement = possibleMovement.filter(item => item != `${axisX + shiftX}${axisY}`);
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

    /* 
        part of isCheck() logic. if the array has the 'true' value, it will return "TRUE" to isCheck() function.
    */
    if (item === 'K' || item === 'k') return possibleMovement.some(item => item === true);

    return possibleMovement
}

export default pawn;