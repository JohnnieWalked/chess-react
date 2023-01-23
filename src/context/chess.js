import { createContext, useEffect, useState } from "react";
import pawn from "../pieceMovement/pawn";
import { possibleMovement } from "../pieceMovement/pawn";

const ChessContext = createContext();

function Provider({ children }) {
    /* шахматне поле (білі - літери з великої букви, чорні - літери з маленької букви) */
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
    
    /* Відповідає за порядок руху гравців (істина - білі, хибний - чорні) */
    const [order, setOrder] = useState(true);

    /* Відповідає за вибір фігури у клітинці */
    const [pieceID, setPieceID] = useState('');
    const [pieceName, setPieceName] = useState('');

    const getPiece = (chessPiece) => {
        if (pieceID === "" && chessPiece.firstChild.innerHTML === "") return;
        setPieceID(chessPiece.id);
        setPieceName(chessPiece.firstChild.innerHTML);
    }

    const selectionAlgorithm = (item, xy) => {
        let temp = item.toLowerCase();
        switch (temp) {
            case 'p': pawn(item, xy, board); console.log(possibleMovement); break;
            case 'r': console.log("gonna use function", temp); break;
            case 'n': console.log("gonna use function", temp); break;
            case 'b': console.log("gonna use function", temp); break;
            case 'q': console.log("gonna use function", temp); break;
            case 'k': console.log("gonna use function", temp); break;
        }
    }

    useEffect(() => {
        getPiece;
        selectionAlgorithm(pieceName, pieceID);
    }, [pieceName, pieceID])

    useEffect(() => {

    }, [board])


    return (
        <ChessContext.Provider value={{board, setBoard, order, setOrder, getPiece}}>
            {children}
        </ChessContext.Provider>
    )
}

export { Provider };
export default ChessContext;