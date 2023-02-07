import { pushMove } from "../utils/piece-movement-helper";
/* 
    The functionality is:
     1) knight() accepts the following arguments:
        - the figure we clicked on,
        - its coordinates,
        - actual value of the chessboard;
        In principle, each figure will accept these arguments, so this step is the same for all.

    2) the logic of the check is:
        - pushMove() is a base function that accepts the horse's possible move. We pass the abscissa and ordinate coordinates, current state of a chessboard, shiftX and shiftY. This function returns a string of digit which represents a possible move of a piece.
        - if we have a white figure and the possible movement of the horse does not take the value 'undefined' and does not overlap with the allied figure - then we push the possible movement into the possibleMovement array. The same goes for blacks.
*/

function knight(item, xy, board) {
    let possibleMovement = [];
    const axisX = Number(xy[0]);
    const axisY = Number(xy[1]);    

    /* Х axis */
    possibleMovement.push(pushMove(item, board, axisX, axisY, 2, 1));
    possibleMovement.push(pushMove(item, board, axisX, axisY, 2, -1));
    possibleMovement.push(pushMove(item, board, axisX, axisY, -2, 1));
    possibleMovement.push(pushMove(item, board, axisX, axisY, -2, -1));
    /* Y axis */
    possibleMovement.push(pushMove(item, board, axisX, axisY, 1, 2));
    possibleMovement.push(pushMove(item, board, axisX, axisY, -1, 2));
    possibleMovement.push(pushMove(item, board, axisX, axisY, 1, -2));
    possibleMovement.push(pushMove(item, board, axisX, axisY, -1, -2));

    /* 
    part of isCheck() logic. if the array has the 'true' value, it will return "TRUE" to isCheck() function.
    */
    if (item === 'K' || item === 'k') return possibleMovement.some(item => item === true);

    return possibleMovement.filter(item => item != undefined);
}

export default knight;