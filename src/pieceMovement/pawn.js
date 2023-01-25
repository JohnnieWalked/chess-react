function pawn(item, xy, board) {
    let possiblePawnMovement = [];
    const axisX = Number(xy[0]);
    const axisY = Number(xy[1]);

    /* хід через 1 клітинку */
    if (item === 'P' && axisX === 1) {
        possiblePawnMovement.push(`${axisX + 2}${axisY}`);
    } else if (item === 'p' && axisX === 6) {
        possiblePawnMovement.push(`${axisX - 2}${axisY}`);
    }

    /* хід на 1 клітинку */
    /* перевірка на перешкоду попереду */
    if (item === 'P') {
        possiblePawnMovement.push(`${axisX + 1}${axisY}`);
        possiblePawnMovement = checkPossibleBarrierWhite(axisX, axisY, board, possiblePawnMovement);
    } else if (item === 'p') {
        possiblePawnMovement.push(`${axisX - 1}${axisY}`);
        console.log(possiblePawnMovement);
        possiblePawnMovement = checkPossibleBarrierBlack(axisX, axisY, board, possiblePawnMovement);
        console.log(possiblePawnMovement);
    }

    return possiblePawnMovement;
}

function checkPossibleBarrierWhite(axisX, axisY, board, possiblePawnMovement, i = 1) {
    while (i < 3) {
        if (board[axisX + i][axisY].f === "") {
            console.log(`${axisX + i}${axisY} is a possible move`);
            console.log(possiblePawnMovement);
        } else if (board[axisX + i][axisY].f != "") {
            possiblePawnMovement = []; 
            break;
        } else {
            possiblePawnMovement = possiblePawnMovement.filter(item => item != `${axisX + i}${axisY}`);
        }
        i++;
    }
    return possiblePawnMovement;
}

function checkPossibleBarrierBlack(axisX, axisY, board, possiblePawnMovement, i = -1) {
    while (i > -3) {
        if (board[axisX - (-i)][axisY].f === "") {
            console.log(`${axisX - (-i)}${axisY} is a possible move`);
            console.log(possiblePawnMovement);
        } else if (board[axisX - (-i)][axisY].f != "") {
            possiblePawnMovement = []; 
            break;
        } else {
            possiblePawnMovement = possiblePawnMovement.filter(item => item != `${axisX - (-i)}${axisY}`);
        }
        i--;
    }
    return possiblePawnMovement;
}

export default pawn;