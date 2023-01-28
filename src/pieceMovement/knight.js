/* 
    Функціонал наступний: 
    1) knight() приймає наступні аргументи:
        - фігуру, на яку ми клацнули, 
        - її координати,
        - актуальне значення шахматної дошки;
        В принципі, кожна фігура буде приймати дані аргументи, тому цей крок для всіх однаковий.

    2) логіка перевірки полягає в наступному:
        - pushMove() - це основа, яка приймає до себе можливий хід коня. Тобто передаємо їй координати абсцис та ординат,
        - якщо фігура в нас білого кольору та можливий рух коня не приймає значення undefined та не налазить на союзну фігуру - то ми пушимо можливий рух у масив possibleMovement. Так само і для чорних.
*/

function knight(item, xy, board) {
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
        if (item === "N" && checkPossibleMoveForWhite(parameterX, parameterY)) {
            possibleMovement.push(`${axisX + parameterX}${axisY + parameterY}`);
        } else if (item === "n" && checkPossibleMoveForBlack(parameterX, parameterY)) {
            possibleMovement.push(`${axisX + parameterX}${axisY + parameterY}`);
        }
    }
    /* по осі Х */
    pushMove(2, 1);
    pushMove(2, -1);
    pushMove(-2, 1);
    pushMove(-2, -1);
    /* по осі Y */
    pushMove(1, 2);
    pushMove(-1, 2);
    pushMove(1, -2);
    pushMove(-1, -2);

    return possibleMovement;
}

export default knight;