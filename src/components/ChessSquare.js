import { useEffect } from "react";
import Piece from "react-chess-pieces";
import useChessContext from "../hooks/use-chess-context";
import './chessSquare.css';

function ChessSquare({ square, id, showPossibleWaysClass }) {
    const { setWhiteKingID, setBlackKingID, whiteKing, 
            blackKing, order, check, board, setCastleWhite, setCastleBlack } = useChessContext();

    useEffect(() => {
        if (square.f === "K") {
            /* responsible for allowing player to castle */
            if (whiteKing != id && whiteKing != undefined) {
                setCastleWhite(false);
            }
            setWhiteKingID(id); console.log("Black king", id); 
        } 
        if (square.f === "k") {
            /* responsible for allowing player to castle */
            if (blackKing != id && blackKing != undefined) {
                setCastleBlack(false);
            }
            setBlackKingID(id); console.log("White king", id); 
        } 
    }, [board]);
    
    return (
        <div 
        className={`w-full h-full flex items-center justify-center relative
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