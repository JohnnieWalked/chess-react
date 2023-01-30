import moveHelper from "../utils/piece-movement-helper";

function bishop(item, xy, board) {
    let possibleMovement = [];
    const axisX = Number(xy[0]);
    const axisY = Number(xy[1]);

/* 
    The checking for the possible movement of the bishop is an eternal loop, which will stop only when the end of the field is detected or the enemy piece is identified.
    
    moveHelper() is a function that returns an object:
    const obj = {
            possibleMove: '',   --> resposible for keeping the possible move value.
            loop: true          --> responsible for parameter, that will break loop.
        };
    
    So, function loop() generates an array called 'res'. After that it creates an eternal loop, where variable 'temp' is a work result of function moveHelper(). 
    As far as we receive an object mentioned above, we take value from 'temp.possibleMove' (the value can be an empty string "" or a string with digits "64" which represents a possible move) and push it to the array called 'res' and change the shift of X and Y. And that operation repeats until we receive 'temp.loop = false'. 
    After all we return our variable 'res' which will contain an array of possible movements.
    
*/
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

    console.log(loop(-1, -1));

    /* Left Top Direction */
    possibleMovement.push(loop(-1, -1));

    /* Right Top */
    possibleMovement.push(loop(1, -1));
    
    /* Left Bottom */
    possibleMovement.push(loop(-1, 1));

    /* Right Bottom */
    possibleMovement.push(loop(1, 1));

    return possibleMovement.flat().filter(item => item != "");
}

export default bishop;