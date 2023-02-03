import { useEffect } from "react";
import Piece from "react-chess-pieces";
import useChessContext from "../hooks/use-chess-context";
import './chessSquare.css';

function ChessSquare({ square, id, showPossibleWaysClass }) {
    const { setWhiteKingID, setBlackKingID, whiteKing, blackKing, order, check, board } = useChessContext();

    useEffect(() => {
        if (square.f === "K") setWhiteKingID(id);
        if (square.f === "k") setBlackKingID(id);
    }, [board]);
    
    
    return (
        <div 
        className={`w-12 h-12 flex items-center justify-center relative
        ${square.c === 0 ? 'bg-[#788592]' : 'bg-[#242D38]'} 
        ${showPossibleWaysClass.length != 0 ? 'dot' : ''}
        ${order && check && id === whiteKing ? 'check' : ''}
        ${!order && check && id === blackKing ? 'check' : ''}
        `}
        id={id}>
            <span>{square.f}</span> 
            <Piece piece={square.f} />
        </div>
    )
}

export default ChessSquare;