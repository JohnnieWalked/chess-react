import loop from "../utils/eternal-loop";

function rook(item, xy, board) {
    let possibleMovement = [];
    const axisX = Number(xy[0]);
    const axisY = Number(xy[1]);

    /* Top Direction */
    possibleMovement.push(loop(0, -1, item, axisX, axisY, board));

    /* Right */
    possibleMovement.push(loop(1, 0, item, axisX, axisY, board));

    /* Bottom */
    possibleMovement.push(loop(0, 1, item, axisX, axisY, board));

    /* Left */
    possibleMovement.push(loop(-1, 0, item, axisX, axisY, board));

    /* 
    part of checkKing() logic. if the array has the 'true' value, it will return "TRUE" to checkKing() function.
    */
    if (item === 'K' || item === 'k') return possibleMovement.some(item => item === true);

    return possibleMovement.flat().filter(item => item != "");
}

export default rook;