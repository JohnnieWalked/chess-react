import loop from "../utils/eternal-loop";

function bishop(item, xy, board) {
    let possibleMovement = [];
    const axisX = Number(xy[0]);
    const axisY = Number(xy[1]);

    /* Left Top Direction */
    possibleMovement.push(loop(-1, -1, item, axisX, axisY, board));

    /* Left Bottom */
    possibleMovement.push(loop(1, -1, item, axisX, axisY, board));
    
    /* Right Top */
    possibleMovement.push(loop(-1, 1, item, axisX, axisY, board));

    /* Right Bottom */
    possibleMovement.push(loop(1, 1, item, axisX, axisY, board));

    /* 
    part of isCheck() logic. if the array has the 'true' value, it will return "TRUE" to isCheck() function.
    */
    if (item === 'K' || item === 'k') return possibleMovement.some(item => item === true);

    return possibleMovement.flat().filter(item => item != "");
}

export default bishop;