let possibleMovement = [];

function pawn(item, xy, board) {
    const axisX = Number(xy[0]);
    const axisY = Number(xy[1]);

    /* хід через 1 клітинку */
    if (item === 'P' && axisX === 1) {
        possibleMovement.push(`${axisX + 2}${axisY}`);
    } else if (item === 'p' && axisX === 6) {
        possibleMovement.push(`${axisX - 2}${axisY}`);
    }

    /* хід на 1 клітинку */
    if (item === 'P') {
        possibleMovement.push(`${axisX + 1}${axisY}`);
    } else if (item === 'p') {
        possibleMovement.push(`${axisX - 1}${axisY}`);
    }

    /* перевірка на перешкоду попереду */
    if (item === "P") {
        checkPossibleBarrierWhite(axisX, axisY, board);
    } else {
        checkPossibleBarrierBlack(axisX, axisY, board);
    }

}

function checkPossibleBarrierWhite(axisX, axisY, board, i = 1) {
    while (i < 3) {
        if (board[axisX + i][axisY].f === "") {
            console.log(`${axisX + i}${axisY} is a possible move`);
        } else {
            possibleMovement = possibleMovement.filter(item => item != `${axisX + i}${axisY}`)
        }
        i++;
    }
}

function checkPossibleBarrierBlack(axisX, axisY, board, i = -1) {
    while (i > -3) {
        if (board[axisX - (-i)][axisY].f === "") {
            console.log(`${axisX - (-i)}${axisY} is a possible move`);
        } else {
            possibleMovement = possibleMovement.filter(item => item != `${axisX - (-i)}${axisY}`);
        }
        i--;
    }
}

export { possibleMovement };
export default pawn;