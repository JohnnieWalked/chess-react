import { pushMove } from "./piece-movement-helper";

/* 
    checkCastle() is a helper-function, that will analyze first square on left\right. 
    If this square isn't in the array of possible moves because of possible check on this square - 
    it will delete the square, that allows player to castle, from possible moves array.

    Else - returns an array of possibleMoves;
*/
function checkCastle(isCastle, preventCheckMoves, castleSquare, moveSquare) {
    if (isCastle && isCastle != undefined && !preventCheckMoves.includes(moveSquare) && preventCheckMoves.includes(castleSquare)) {
        return preventCheckMoves.filter(item => item != castleSquare);
    } else {
        return preventCheckMoves;
    }
}

/* 
    castleWays() is a function, which is responsible for checking a path for castling.

    if castling is "TRUE" and there are no allied pieces on a path - function returns possible ways left/right, that allow player to castle or to move, 
    else - returns possible way, that allows player only to move king

*/
function castleWays(item, axisX, axisY, board, isCastle, i) {
    let possibleMovement = [];
    if (item === "K" || item === "k") {
        if (isCastle) {
            if (i < 0) {
                if (pushMove(item, board, axisX, axisY, 0, -1) != undefined) {
                    for (let j = -1; j > -3; j--) {
                        possibleMovement.push(pushMove(item, board, axisX, axisY, 0, j));
                    }
                } 
            }
            if (i > 0) {
                if (pushMove(item, board, axisX, axisY, 0, 1) != undefined) {
                    for (let j = 1; j < 3; j++) {
                        possibleMovement.push(pushMove(item, board, axisX, axisY, 0, j));
                    }
                }
            }
        } else {
            possibleMovement.push(pushMove(item, board, axisX, axisY, 0, i));
        }
    }
    console.log("castleWays", possibleMovement);
    if (possibleMovement.some(item => item === true)) return true;
    return possibleMovement;
}

export { checkCastle };
export default castleWays;