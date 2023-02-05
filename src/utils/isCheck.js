import knight from "../pieceMovement/knight";
import bishop from "../pieceMovement/bishop";
import rook from "../pieceMovement/rook";
import pawn from "../pieceMovement/pawn";
import king from "../pieceMovement/king";

/* 
    The function isCheck() is responsible for calculating a check. 
    The main idea of this function is to assign to a knight's, bishop's and rook's movements to the king. 
    It will return "TRUE" if there is an enemy piece (bishop, knight, queen, rook) on the same axis (vertical, horizontal or diagonal)
*/

function isCheck(item, xy, board) {
    if (knight(item, xy, board) 
        || rook(item, xy, board) 
        || bishop(item, xy, board) 
        || pawn(item, xy, board)) {
        return true;
    }
} 

export default isCheck;