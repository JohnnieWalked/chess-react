import { checkPossibleMove } from "../utils/piece-movement-helper";
/* 
    The functionality is:
     1) knight() accepts the following arguments:
        - the figure we clicked on,
        - its coordinates,
        - actual value of the chessboard;
        In principle, each figure will accept these arguments, so this step is the same for all.

    2) the logic of the check is:
         - pushMove() is a base function that accepts the horse's possible move. We pass the abscissa and ordinate coordinates,
         - if we have a white figure and the possible movement of the horse does not take the value 'undefined' and does not overlap with the allied figure - then we push the possible movement into the possibleMovement array. The same goes for blacks.
*/

function knight(item, xy, board) {
    let possibleMovement = [];
    const axisX = Number(xy[0]);
    const axisY = Number(xy[1]);    

    const pushMove = (parameterX, parameterY) => {
        if (item === "N" && checkPossibleMove(parameterX, parameterY, board, axisX, axisY, /[A-Z]/)) {
            possibleMovement.push(`${axisX + parameterX}${axisY + parameterY}`);
        } else if (item === "n" && checkPossibleMove(parameterX, parameterY, board, axisX, axisY, /[a-z]/)) {
            possibleMovement.push(`${axisX + parameterX}${axisY + parameterY}`);
        }
    }
    /* Х axis */
    pushMove(2, 1);
    pushMove(2, -1);
    pushMove(-2, 1);
    pushMove(-2, -1);
    /* Y axis */
    pushMove(1, 2);
    pushMove(-1, 2);
    pushMove(1, -2);
    pushMove(-1, -2);

    return possibleMovement;
}

export default knight;