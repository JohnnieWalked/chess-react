import { createContext, useEffect, useState } from "react";
import pawn from "../pieceMovement/pawn";
import knight from "../pieceMovement/knight";

const ChessContext = createContext();

function Provider({ children }) {
    /* шахматне поле (білі - літери з великої букви, чорні - з маленької букви) */
    /* Перший параметр - рядок, другий - колонка */
    // console.log(board[0][0]);
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

    /* Відповідає за показ ймовірних шляхів */
    const [showPossibleWays, setShowPossibleWays] = useState([]);
    
    /* Відповідає за порядок руху гравців (істина - білі, хибний - чорні) */
    const [order, setOrder] = useState(true);

    /* Відповідає за вибір фігури у клітинці */
    const [pieceID, setPieceID] = useState('');
    const [pieceName, setPieceName] = useState('');

    const selectionAlgorithm = (item, xy) => {
        let temp = item.toLowerCase();
        switch (temp) {
            case 'p': console.log(pawn(item, xy, board)); setShowPossibleWays((pawn(item, xy, board))); break;
            case 'r': console.log("gonna use function", temp); break;
            case 'n': console.log((knight(item, xy, board))); setShowPossibleWays((knight(item, xy, board))); break;
            case 'b': console.log("gonna use function", temp); break;
            case 'q': console.log("gonna use function", temp); break;
            case 'k': console.log("gonna use function", temp); break;
        }
    };

    const movePiece = (chessPieceID) => {
        const oldAxisX = pieceID[0],
              oldAxisY = pieceID[1],
              newAxisX = chessPieceID[0],
              newAxisY = chessPieceID[1];

        // console.log("oldAxisX - ", oldAxisX);
        // console.log("oldAxisY - ", oldAxisY);
        // console.log("newAxisX - ", newAxisX);
        // console.log("newAxisY - ", newAxisY);

        let newBoard = JSON.parse(JSON.stringify([...board]));
        newBoard[newAxisX][newAxisY].f = newBoard[oldAxisX][oldAxisY].f;
        newBoard[oldAxisX][oldAxisY].f = '';

        setBoard(newBoard);
    }

    useEffect(() => {
        selectionAlgorithm(pieceName, pieceID);      
    }, [pieceName, pieceID]);

    function clearState() {
        setPieceID('');
        setPieceName('');
        setShowPossibleWays([]);
    }

    useEffect(() => {
        clearState();
    }, [board])

    return (
        <ChessContext.Provider value={{board, setBoard, pieceID, pieceName, setPieceID, setPieceName, selectionAlgorithm, showPossibleWays, movePiece, clearState}}>
            {children}
        </ChessContext.Provider>
    )
}

export { Provider };
export default ChessContext;