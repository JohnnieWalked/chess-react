import moveHelper from "../utils/piece-movement-helper";

function rook(item, xy, board) {
    let possibleMovement = [];
    const axisX = Number(xy[0]);
    const axisY = Number(xy[1]);

    const loop = (shiftX, shiftY) => {
        let res = [];
        while (true) {
            let temp = moveHelper(item, axisX, axisY, board, shiftX, shiftY);
            res.push(temp.possibleMove);
            if (temp.loop === false) return res;
            if (shiftX < 0) shiftX--;
            if (shiftX > 0) shiftX++;
            if (shiftY < 0) shiftY--;
            if (shiftY > 0) shiftY++;
        }
    }

    /* Top Direction */
    possibleMovement.push(loop(0, -1));

    /* Right */
    possibleMovement.push(loop(1, 0));

    /* Bottom */
    possibleMovement.push(loop(0, 1));

    /* Left */
    possibleMovement.push(loop(-1, 0));

    return possibleMovement.flat().filter(item => item != "");
}

export default rook;