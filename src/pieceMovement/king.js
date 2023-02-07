import { pushMove } from "../utils/piece-movement-helper";
import castleWays from "../utils/castling";

function king(item, xy, board, castleWhite = false, castleBlack = false) {
    let possibleMovement = [];
    const axisX = Number(xy[0]);
    const axisY = Number(xy[1]);

    /* Left Direction & responsible for castling */
    if (item === "K") possibleMovement.push(castleWays(item, axisX, axisY, board, castleWhite[0], -1));
    if (item === 'k') possibleMovement.push(castleWays(item, axisX, axisY, board, castleBlack[0], -1))    
    
    /* Right & responsible for castling */
    if (item === "K") possibleMovement.push(castleWays(item, axisX, axisY, board, castleWhite[1], 1));
    if (item === "k") possibleMovement.push(castleWays(item, axisX, axisY, board, castleBlack[1], 1));
    
    /* Bottom */
    possibleMovement.push(pushMove(item, board, axisX, axisY, 1, 0));

    /* Top */
    possibleMovement.push(pushMove(item, board, axisX, axisY, -1, 0));
    
    /* Left Top */
    possibleMovement.push(pushMove(item, board, axisX, axisY, -1, -1));

    /* Right Top */
    possibleMovement.push(pushMove(item, board, axisX, axisY, -1, 1));
    
    /* Left Bottom */
    possibleMovement.push(pushMove(item, board, axisX, axisY, 1, -1));

    /* Right Bottom */
    possibleMovement.push(pushMove(item, board, axisX, axisY, 1, 1));

    console.log("king.js", possibleMovement);

    /* 
    part of isCheck() logic. if the array has the 'true' value, it will return "TRUE" to isCheck() function.
    */
    if (possibleMovement.some(item => item === true)) return true;

    return possibleMovement.flat().filter(item => item != undefined);
}

export default king;