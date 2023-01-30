import { createContext, useCallback, useEffect, useState } from "react";
import pawn from "../pieceMovement/pawn";
import knight from "../pieceMovement/knight";
import bishop from "../pieceMovement/bishop";
import rook from "../pieceMovement/rook";
import queen from "../pieceMovement/queen";

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

    /* Responsible for showing possible paths */
    const [showPossibleWays, setShowPossibleWays] = useState([]);
    
    /* Responsible for the order of movement of players (true - white's, false - black's) */
    const [order, setOrder] = useState(true);

    /* Responsible for selecting the figure in the square */
    const [pieceID, setPieceID] = useState('');
    const [pieceName, setPieceName] = useState('');

    const algorithmSelection = (item, xy) => {
        let temp = item.toLowerCase();
        switch (temp) {
            case 'p': console.log(pawn(item, xy, board)); setShowPossibleWays((pawn(item, xy, board))); break;
            case 'r': console.log((rook(item, xy, board))); setShowPossibleWays((rook(item, xy, board))); break;
            case 'n': console.log((knight(item, xy, board))); setShowPossibleWays((knight(item, xy, board))); break;
            case 'b': console.log(bishop(item, xy, board)); setShowPossibleWays((bishop(item, xy, board))); break;
            case 'q': console.log(queen(item, xy, board)); setShowPossibleWays((queen(item, xy, board))); break;
            case 'k': console.log("gonna use function", temp); break;
        }
    };

    const movePiece = (chessPieceID) => {
        const oldAxisX = pieceID[0],
              oldAxisY = pieceID[1],
              newAxisX = chessPieceID[0],
              newAxisY = chessPieceID[1];

        let newBoard = JSON.parse(JSON.stringify([...board]));
        newBoard[newAxisX][newAxisY].f = newBoard[oldAxisX][oldAxisY].f;
        newBoard[oldAxisX][oldAxisY].f = '';

        setBoard(newBoard);
        setOrder(!order);
    }

    useEffect(() => {
        algorithmSelection(pieceName, pieceID);
    }, [pieceName, pieceID])

    function clearState() {
        setPieceID('');
        setPieceName('');
        setShowPossibleWays([]);
    }

    useEffect(() => {
        clearState();
    }, [board]);

    return (
        <ChessContext.Provider value={{board, setBoard, pieceID, pieceName, setPieceID, setPieceName, showPossibleWays, movePiece, clearState, order}}>
            {children}
        </ChessContext.Provider>
    )
}

export { Provider };
export default ChessContext;