/* 
    Частина функціоналу була взята з функції руху фігури "Кінь". 
    Проте тут є свої нюанси. 

    Перевіркою на можливий рух слона є вічний цикл, який буде зупинятися після виявлення кінця поля та ідентифікації ворожої фігури. 

*/

function bishop(item, xy, board) {
    let possibleMovement = [];
    const axisX = Number(xy[0]);
    const axisY = Number(xy[1]);

    const checkPossibleMoveForWhite = (parameterX, parameterY) => {
        return board[axisX + parameterX] && board[axisY + parameterY] != undefined 
               && !/[A-Z]/.test(board[axisX + parameterX][axisY + parameterY].f);
    }

    const checkPossibleMoveForBlack = (parameterX, parameterY) => {
        return board[axisX + parameterX] && board[axisY + parameterY] != undefined
              && !/[a-z]/.test(board[axisX + parameterX][axisY + parameterY].f);
    }

    const pushMove = (parameterX, parameterY) => {

        if (item === "B" && checkPossibleMoveForWhite(parameterX, parameterY)) {
            if (/[a-z]/.test(board[axisX + parameterX][axisY + parameterY].f)) {
                pushMoveHelper(parameterX, parameterY);
                return false;
            } else {
                pushMoveHelper(parameterX, parameterY);
            }
        } 
        
        else if (item === "b" && checkPossibleMoveForBlack(parameterX, parameterY)) {
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

    /* Допоміжна функція для уникнення повторення коду */
    const pushMoveHelper = (parameterX, parameterY) => {
        possibleMovement.push(`${axisX + parameterX}${axisY + parameterY}`);
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