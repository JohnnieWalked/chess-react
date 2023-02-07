import loopMoveHelper from "./piece-movement-helper";

/* 
    The checking for the possible movement of the bishop, rook or queen is an eternal loop, 
    which will stop only when the end of the field is detected or the enemy piece is identified.
    
    loopMoveHelper() is a function that returns an object:
    const obj = {
            possibleMove: '',   --> resposible for keeping the possible move value.
            loop: true,         --> responsible for parameter, that will break loop.
            isCheck: false      --> responsible for parameter, that will show check.
        };
    
    So, function loop() generates an array called 'res'. After that it creates an eternal loop, where variable 'temp' is a work result of function loopMoveHelper(). 

    As far as we receive an object mentioned above, we take value from 'temp.possibleMove' (the value can be an empty string ("") or a string with digits ("64") which represents a possible move) and push it to the array called 'res' and change the shift of X and Y. 
    That operation repeats until we receive 'temp.loop = false'. 
    After all we return our variable 'res', which will contain an array of possible movements.

    If temp.isCheck will be "TRUE", the loop breaks and returns value "TRUE".
*/
function loop(shiftX, shiftY, item, axisX, axisY, board) {
    let res = [];
    while (true) {
        let temp = loopMoveHelper(item, axisX, axisY, board, shiftX, shiftY);
        /* responsible for check the King */
        if (temp.isCheck) return true; 
        res.push(temp.possibleMove);
        if (temp.loop === false) return res;
        if (shiftX < 0) shiftX--;
        if (shiftX > 0) shiftX++;
        if (shiftY < 0) shiftY--;
        if (shiftY > 0) shiftY++;
    }
}

export default loop;