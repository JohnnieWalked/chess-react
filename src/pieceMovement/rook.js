import { checkPossibleMove } from "../utils/piece-movement-helper";

function rook(item, xy, board) {
    let possibleMovement = [];
    const axisX = Number(xy[0]);
    const axisY = Number(xy[1]);

    const pushMoveHelper = (parameterX, parameterY) => {
        possibleMovement.push(`${axisX + parameterX}${axisY + parameterY}`);
    }

    const pushMove = (parameterX, parameterY) => {
        if (item === "R" && checkPossibleMove(parameterX, parameterY, board, axisX, axisY, /[A-Z]/)) {
            if (/[a-z]/.test(board[axisX + parameterX][axisY + parameterY].f)) {
                pushMoveHelper(parameterX, parameterY);
                return false;
            } else {
                pushMoveHelper(parameterX, parameterY);
            }
        } 
        
        else if (item === "r" && checkPossibleMove(parameterX, parameterY, board, axisX, axisY, /[a-z]/)) {
            if (/[A-Z]/.test(board[axisX + parameterX][axisY + parameterY].f)) {
                pushMoveHelper(parameterX, parameterY);
                return false;
            } else {
                pushMoveHelper(parameterX, parameterY);
            }
        } 
        
        else {
            return false;
        }
    }

    const loopTop = (x = 0, y = -1) => {
        while (true) {
            let res = pushMove(x, y);
            if (res === false) break;
            y--;
        }
    }
    loopTop();

    const loopRight = (x = 1, y = 0) => {
        while (true) {
            let res = pushMove(x, y);
            if (res === false) break;
            x++;
        }
    }
    loopRight();

    const loopBottom = (x = 0, y = 1) => {
        while (true) {
            let res = pushMove(x, y);
            if (res === false) break;
            y++;
        }
    }
    loopBottom();

    const loopLeft = (x = -1, y = 0) => {
        while (true) {
            let res = pushMove(x, y);
            if (res === false) break;
            x--;
        }
    }
    loopLeft();


    return possibleMovement;
}

export default rook;