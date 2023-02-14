/* 
    If possible move does NOT go beyond the chessboard
    and does NOT collide with allied piece it will return 'true', else - 'false' 
*/
const checkPossibleMove = (shiftX, shiftY, board, axisX, axisY, regExp) => {
    return board[axisX + shiftX] !== undefined && board[axisY + shiftY] !== undefined 
           && !regExp.test(board[axisX + shiftX][axisY + shiftY].f);
}

/* 
    Function pushMove() was created to check the specific move
    as opposed to a function loopMoveHelper() which works with eternal loop and checks for moves. 
    
    This function receives name of piece, current state of a chessboard, current 'axisX' and 'axisY' of piece,
    and also 'shiftX' and 'shiftY' to check possible move in that direction. 

    This function was used in 'knight' and 'king' movement.
*/
const pushMove = (item, board, axisX, axisY, shiftX, shiftY) => {
    /* for white */
    if (item === item.toUpperCase() && checkPossibleMove(shiftX, shiftY, board, axisX, axisY, /[A-Z]/)) {
        /* part of isCheck() logic. */
        if (item === "K") {
            /* 
            if the 'pieceName' is a white king and enemy knight is in radius of a threat - it will return 'TRUE'. */
            if (shiftX > 1 || shiftX < -1 || shiftY > 1 || shiftY < -1) {
                if (board[axisX + shiftX][axisY + shiftY].f === "n"
                    && board[axisX + shiftX][axisY + shiftY].f !== "k") {
                    return true;
                }
            } else {
                /* if the 'pieceName' is a white king and next move will be near white king - returns 'TRUE' */
                if (board[axisX + shiftX][axisY + shiftY].f === "k") {
                    return true;
                }
            }
        }
        return `${axisX + shiftX}${axisY + shiftY}`;

    /* for black */
    } else if (item === item.toLowerCase() && checkPossibleMove(shiftX, shiftY, board, axisX, axisY, /[a-z]/)) {
        /* part of isCheck() logic. */
        if (item === "k") {
            /* 
            if the 'pieceName' is a black king and enemy knight is in radius of a threat - it will return 'TRUE'. */
            if (shiftX > 1 || shiftX < -1 || shiftY > 1 || shiftY < -1) {
                if (board[axisX + shiftX][axisY + shiftY].f === "N" 
                    && board[axisX + shiftX][axisY + shiftY].f !== "K") {
                    return true;
                }
            } else {
                /* if the 'pieceName' is a black king and next move will be near white king - returns 'TRUE' */
                if (board[axisX + shiftX][axisY + shiftY].f === "K") {
                    return true;
                }
            }
        }
        return `${axisX + shiftX}${axisY + shiftY}`;
    }
} 

/* 
    Function loopMoveHelper() was created to optimize movement of pieces such as: bishop, queen, rook.
    Function receives piece, its coordinates, chessboard, shiftX and shiftY. 'shiftX' and 'shiftY' are needed to check the opportunity to move piece on next square. 

    This function is used with eternal loop, which will send to function 'shiftX++' and 'shiftY++' for checking next squares. 
    If possible move goes beyond the chessboard, collides with allied piece or collides with enemy piece - it will return an object:
        const obj = {
            possibleMove: '',   --> resposible to keep the possible move value.
            loop: true,         --> responsible for parameter, that will break loop.
            isCheck: false      --> responsible for parameter, that will show check.
        };
*/
function loopMoveHelper
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
        loop: true,
        isCheck: false
    };

    /* for White pieces */
    if (pieceName === pieceName.toUpperCase() && checkPossibleMove(shiftX, shiftY, board, axisX, axisY, /[A-Z]/)) {
        /* 
        part of isCheck() logic. if pieceName is a white king and there are enemy pieces such as bishop,
        queen or rook on the path - it will return 'TRUE'.

        IMPORTANT: we must separate check by rook and check by bishop, because they use different shifting. 
        If we do NOT this, the rook will be capable to put check the king diagonally.
        */
        if (shiftX === 0 || shiftY === 0) {
            if (pieceName === "K" && /[q,r]/.test(board[axisX + shiftX][axisY + shiftY].f)) {
                obj.isCheck = true;
                return obj;
            }
        } else {
            if (pieceName === "K" && /[q,b]/.test(board[axisX + shiftX][axisY + shiftY].f)) {
                obj.isCheck = true;
                return obj;
            }
        }
        /* 
            if there is an enemy piece on a square, it will add this square to variable 
            and set 'obj.loop' value to 'false'. 
            if we do NOT stop loop - rook, bishop and queen will be capable to hit any enemy piece on their path
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
        part of isCheck() logic. if pieceName is a black king and there are enemy pieces such as bishop,
        queen or rook on the path - it will return 'TRUE'.

        IMPORTANT: we must separate check by rook and by bishop, because they use different shifting. 
        if we do NOT this, the rook will be capable to put check the king diagonally.
        */
        if (shiftX === 0 || shiftY === 0) {
            if (pieceName === "k" && /[Q,R]/.test(board[axisX + shiftX][axisY + shiftY].f)) {
                obj.isCheck = true;
                return obj;
            }
        } else {
            if (pieceName === "k" && /[Q,B]/.test(board[axisX + shiftX][axisY + shiftY].f)) {
                obj.isCheck = true;
                return obj;
            }
        }
        
        /* 
            if there is an enemy piece on a square, it will add this square to variable 
            and set 'obj.loop' value to 'false'
            if we do NOT stop loop - rook, bishop and queen will be capable to hit any enemy piece on their path 
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
export default loopMoveHelper;