import { pushMove } from "../utils/piece-movement-helper";

function king(item, xy, board) {
    let possibleMovement = [];
    const axisX = Number(xy[0]);
    const axisY = Number(xy[1]);

    /* Top Direction */
    possibleMovement.push(pushMove(item, board, axisX, axisY, 0, -1));

    /* Right */
    possibleMovement.push(pushMove(item, board, axisX, axisY, 1, 0));
    
    /* Bottom */
    possibleMovement.push(pushMove(item, board, axisX, axisY, 0, 1));

    /* Left */
    possibleMovement.push(pushMove(item, board, axisX, axisY, -1, 0));

    /* Left Top */
    possibleMovement.push(pushMove(item, board, axisX, axisY, -1, -1));

    /* Right Top */
    possibleMovement.push(pushMove(item, board, axisX, axisY, 1, -1));
    
    /* Left Bottom */
    possibleMovement.push(pushMove(item, board, axisX, axisY, -1, 1));

    /* Right Bottom */
    possibleMovement.push(pushMove(item, board, axisX, axisY, 1, 1));

    return possibleMovement.filter(item => item != undefined);
}

export default king;