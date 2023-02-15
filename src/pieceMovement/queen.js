import loop from "../utils/eternal-loop";

function queen(item, xy, board) {
    let possibleMovement = [];
    const axisX = Number(xy[0]);
    const axisY = Number(xy[1]);

    /* Left Direction */
    possibleMovement.push(loop(0, -1, item, axisX, axisY, board));

    /* Bottom */
    possibleMovement.push(loop(1, 0, item, axisX, axisY, board));

    /* Right */
    possibleMovement.push(loop(0, 1, item, axisX, axisY, board));

    /* Top */
    possibleMovement.push(loop(-1, 0, item, axisX, axisY, board));

    /* Left Top */
    possibleMovement.push(loop(-1, -1, item, axisX, axisY, board));

    /* Left Bottom */
    possibleMovement.push(loop(1, -1, item, axisX, axisY, board));
    
    /* Right Top */
    possibleMovement.push(loop(-1, 1, item, axisX, axisY, board));

    /* Right Bottom */
    possibleMovement.push(loop(1, 1, item, axisX, axisY, board));

    return possibleMovement.flat().filter(item => item !== "");
}

export default queen;