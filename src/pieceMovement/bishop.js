import { checkPossibleMove } from "../utils/piece-movement-helper";

/* 
    Частина функціоналу була взята з функції руху фігури "Кінь". 
    Проте тут є свої нюанси. 

    Перевіркою на можливий рух слона є вічний цикл, який буде зупинятися після виявлення кінця поля та ідентифікації ворожої фігури. 

*/

function bishop(item, xy, board) {
    let possibleMovement = [];
    const axisX = Number(xy[0]);
    const axisY = Number(xy[1]);

    const pushMoveHelper = (parameterX, parameterY) => {
        possibleMovement.push(`${axisX + parameterX}${axisY + parameterY}`);
    }

    const pushMove = (parameterX, parameterY) => {
        if (item === "B" && checkPossibleMove(parameterX, parameterY, board, axisX, axisY, /[A-Z]/)) {
            if (/[a-z]/.test(board[axisX + parameterX][axisY + parameterY].f)) {
                pushMoveHelper(parameterX, parameterY);
                return false;
            } else {
                pushMoveHelper(parameterX, parameterY);
            }
        } 
        
        else if (item === "b" && checkPossibleMove(parameterX, parameterY, board, axisX, axisY, /[a-z]/)) {
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

    const loopLeftTop = (x = -1, y = -1) => {
        while (true) {
            let res = pushMove(x, y);
            if (res === false) break;
            x--;
            y--;
        }
    }
    loopLeftTop();

    const loopRightTop = (x = 1, y = -1) => {
        while (true) {
            let res = pushMove(x, y);
            if (res === false) break;
            x++;
            y--;
        }
    }
    loopRightTop();

    const loopLeftBottom = (x = -1, y = 1) => {
        while (true) {
            let res = pushMove(x, y);
            if (res === false) break;
            x--;
            y++;
        }
    }
    loopLeftBottom();

    const loopRightBottom = (x = 1, y = 1) => {
        while (true) {
            let res = pushMove(x, y);
            if (res === false) break;
            x++;
            y++;
        }
    }
    loopRightBottom();

    return possibleMovement;
}

export default bishop;