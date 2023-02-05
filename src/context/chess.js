import { createContext, useEffect, useState } from "react";
import pawn from "../pieceMovement/pawn";
import knight from "../pieceMovement/knight";
import bishop from "../pieceMovement/bishop";
import rook from "../pieceMovement/rook";
import queen from "../pieceMovement/queen";
import king from "../pieceMovement/king";
import isCheck from "../utils/isCheck";

const ChessContext = createContext();

function Provider({ children }) {
    /* chess field (white - capital letters, black - small) */
    /* First parameter - row, second - column */
    const [board, setBoard] = useState([
        [{c: 0, f: 'R'}, {c: 1, f: 'N'}, {c: 0, f: 'B'}, {c: 1, f: 'K'},
        {c: 0, f: 'Q'}, {c: 1, f: 'B'}, {c: 0, f: 'N'}, {c: 1, f: 'R'}],
        [{c: 1, f: 'P'}, {c: 0, f: 'P'}, {c: 1, f: 'P'}, {c: 0, f: 'P'}, 
        {c: 1, f: 'P'}, {c: 0, f: 'P'}, {c: 1, f: 'P'}, {c: 0, f: 'P'}],

        [{c: 0, f: ''}, {c: 1, f: ''}, {c: 0, f: ''}, {c: 1, f: ''}, 
        {c: 0, f: ''}, {c: 1, f: ''}, {c: 0, f: ''}, {c: 1, f: ''}],
        [{c: 1, f: ''}, {c: 0, f: ''}, {c: 1, f: ''}, {c: 0, f: ''}, 
        {c: 1, f: ''}, {c: 0, f: ''}, {c: 1, f: ''}, {c: 0, f: ''}],
        [{c: 0, f: ''}, {c: 1, f: ''}, {c: 0, f: ''}, {c: 1, f: ''}, 
        {c: 0, f: ''}, {c: 1, f: ''}, {c: 0, f: ''}, {c: 1, f: ''}],
        [{c: 1, f: ''}, {c: 0, f: ''}, {c: 1, f: ''}, {c: 0, f: ''}, 
        {c: 1, f: ''}, {c: 0, f: ''}, {c: 1, f: ''}, {c: 0, f: ''}],

        [{c: 0, f: 'p'}, {c: 1, f: 'p'}, {c: 0, f: 'p'}, {c: 1, f: 'p'}, 
        {c: 0, f: 'p'}, {c: 1, f: 'p'}, {c: 0, f: 'p'}, {c: 1, f: 'p'}],
        [{c: 1, f: 'r'}, {c: 0, f: 'n'}, {c: 1, f: 'b'}, {c: 0, f: 'k'}, 
        {c: 1, f: 'q'}, {c: 0, f: 'b'}, {c: 1, f: 'n'}, {c: 0, f: 'r'}],
    ]);

    /* resposible for showing a check */
    const [check, setCheck] = useState(false);

    /* watch kings locations (id) */
    const [whiteKing, setWhiteKingID] = useState('');
    const [blackKing, setBlackKingID] = useState('');

    /* Responsible for showing possible paths */
    const [showPossibleWays, setShowPossibleWays] = useState([]);
    
    /* Responsible for the order of movement of players (true - white's, false - black's) */
    const [order, setOrder] = useState(true);

    /* Responsible for selecting the figure in the square */
    const [pieceID, setPieceID] = useState('');
    const [pieceName, setPieceName] = useState('');    

    useEffect(() => {
        console.log("ALGO SELECTED");
        const algorithmSelection = (item, xy) => {
            let temp = item.toLowerCase();
            switch (temp) {
    
                case 'p': temp = pawn(item, xy, board); console.log("pawn", temp);
                    preventCheck(temp); break;
    
                case 'r': temp = rook(item, xy, board); console.log("rook", temp); 
                    preventCheck(temp); break;
    
                case 'n': temp = knight(item, xy, board); console.log("knight", temp); 
                    preventCheck(temp); break;
    
                case 'b': temp = bishop(item, xy, board); console.log("bishop", temp);
                    preventCheck(temp); break;
    
                case 'q': temp = queen(item, xy, board); console.log("queen", temp); 
                    preventCheck(temp); break;
    
                case 'k': temp = king(item, xy, board); console.log("king", temp); 
                    preventCheck(temp); break;
            }
        };
        algorithmSelection(pieceName, pieceID);
    }, [pieceID]);

    /* preventCheck() sorts possible movements to avoid the check */
    const preventCheck = (possibleWays) => {
        const oldAxisX = pieceID[0],
              oldAxisY = pieceID[1];

        let preventCheckMoves = possibleWays.map(xy => {
            const newAxisX = xy[0],
                  newAxisY = xy[1];
            let newBoard = JSON.parse(JSON.stringify([...board]));
            newBoard[newAxisX][newAxisY].f = newBoard[oldAxisX][oldAxisY].f;
            newBoard[oldAxisX][oldAxisY].f = '';

            /* 
                responsible for king's movement to avoid checks. 
                    isCheck() is responsible for watching checks by pieces, 
                    king() is responsible for keeping distance between kings

                logic: if possible king's move has a threat from enemy piece OR 
                not keeping distance between kings - returns "", else returns possible move
            */
            if (pieceName === 'k' || pieceName === "K") {
                if (isCheck(pieceName, xy, newBoard) || king(pieceName, xy, newBoard) === true) {
                    return '';
                } else {
                    return xy;
                }
            }

            /* 
            responsible for allied pieces' movement to avoid the check
                the main difference between function above - is static king, we choose only allied pieces
            */
            if (/[P,R,N,B,Q]/.test(pieceName)) {
                if (!isCheck("K", whiteKing, newBoard)) {
                    return xy;
                } else {
                    return "";
                }
            } else if (/[p,r,n,b,q]/) {
                if (!isCheck("k", blackKing, newBoard)) {
                    return xy;
                } else {
                    return "";
                }
            }
        });
        
        console.log('preventCHeck', preventCheckMoves.filter(item => item != ""));
        setShowPossibleWays(preventCheckMoves.filter(item => item != ""));
    }

    const movePiece = (chessPieceID) => {
        console.log("MOVE PIECE");
        const oldAxisX = pieceID[0],
              oldAxisY = pieceID[1],
              newAxisX = chessPieceID[0],
              newAxisY = chessPieceID[1];

        let newBoard = JSON.parse(JSON.stringify([...board]));
        newBoard[newAxisX][newAxisY].f = newBoard[oldAxisX][oldAxisY].f;
        newBoard[oldAxisX][oldAxisY].f = '';
        setBoard(newBoard);
        /* 
        responsible for calculating a check. 
        if the order is 'true', white king can NOT be checked, isCheck() will calculate if black king was checked. 
        if the order is 'false', black king can NOT be checked, isCheck() will calculate if white king was checked 
        */
        setCheck(!order ? isCheck('K', whiteKing, newBoard) : isCheck('k', blackKing, newBoard));
        /* after move - change order */
        setOrder(!order);
    };

    function clearState() {
        setPieceID('');
        setPieceName('');
        setShowPossibleWays([]);
    }

    useEffect(() => {
        clearState();
    }, [board]);

    return (
        <ChessContext.Provider value={{board, setBoard, pieceID, pieceName, setPieceID, setPieceName, showPossibleWays, movePiece, clearState, order, setWhiteKingID, setBlackKingID, whiteKing, blackKing, check}}>
            {children}
        </ChessContext.Provider>
    )
}

export { Provider };
export default ChessContext;