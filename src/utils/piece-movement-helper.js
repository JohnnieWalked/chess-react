/* 
    If possible move does NOT go beyond the chessboard
    and does NOT collide with allied piece it will return 'true', else - 'false' 
*/
const checkPossibleMove = (shiftX, shiftY, board, axisX, axisY, regExp) => {
    return board[axisX + shiftX] && board[axisY + shiftY] != undefined 
           && !regExp.test(board[axisX + shiftX][axisY + shiftY].f);
}

/* 
    Function pushMove() was created to check the specific move
    as opposed to a function moveHelper() which works with eternal loop and checks for moves. 
    
    This function receives name of piece, current state of a chessboard, current 'axisX' and 'axisY' of piece,
    and also 'shiftX' and 'shiftY' to check possible move in that direction. 

    This function was used in 'knight' and 'king' movement.
*/
const pushMove = (item, board, axisX, axisY, shiftX, shiftY) => {
    /* for white */
    if (item === item.toUpperCase() && checkPossibleMove(shiftX, shiftY, board, axisX, axisY, /[A-Z]/)) {
        return `${axisX + shiftX}${axisY + shiftY}`;
    /* for black */
    } else if (item === item.toLowerCase() && checkPossibleMove(shiftX, shiftY, board, axisX, axisY, /[a-z]/)) {
        return `${axisX + shiftX}${axisY + shiftY}`;
    }
} 

/* 
    Function moveHelper() created to optimize movement of pieces such as: bishop, queen, rook.
    Function receives piece, its coordinates, chessboard, shiftX and shiftY. 'shiftX' and 'shiftY' are needed to check the opportunity to move piece on next square. 

    This function is commonly used with eternal loop, which will send to function 'shiftX++' and 'shiftY++' for checking next squares. 
    If possible move goes beyond the chessboard, collides with allied piece or collides with enemy piece - it will return an object:
        const obj = {
            possibleMove: '',   --> resposible to keep the possible move value.
            loop: true          --> responsible for parameter, that will break loop.
        };
*/
function moveHelper
    (
        pieceName, /* name of a piece we are receiving */ 
        axisX, /* current location of piece (X) */
        axisY, /* current location of piece (Y) */
        board, /* current state of a chessboard */
        shiftX,
        shiftY 
    ) {

    const obj = {
        possibleMove: '',
        loop: true
    };

    /* for White pieces */
    if (pieceName === pieceName.toUpperCase() && checkPossibleMove(shiftX, shiftY, board, axisX, axisY, /[A-Z]/)) {
        /* 
            if there is an enemy piece on a square, it will add this square to variable 
            and set 'obj.loop' value to 'false' 
        */
        if (/[a-z]/.test(board[axisX + shiftX][axisY + shiftY].f)) {
            obj.possibleMove = `${axisX + shiftX}${axisY + shiftY}`;
            obj.loop = false;
        } else {
            obj.possibleMove = `${axisX + shiftX}${axisY + shiftY}`;
        }
    } 
    /* for Black pieces */
    else if (pieceName === pieceName.toLowerCase() && checkPossibleMove(shiftX, shiftY, board, axisX, axisY, /[a-z]/)) {
        /* 
            if there is an enemy piece on a square, it will add this square to variable 
            and set 'obj.loop' value to 'false' 
        */
        if (/[A-Z]/.test(board[axisX + shiftX][axisY + shiftY].f)) {
            obj.possibleMove = `${axisX + shiftX}${axisY + shiftY}`;
            obj.loop = false;
        } else {
            obj.possibleMove = `${axisX + shiftX}${axisY + shiftY}`;
        }
    }
    else {
        obj.loop = false;
    }

    return obj;
}

export { pushMove };
export default moveHelper;