import { useEffect } from "react";
import Piece from "react-chess-pieces";
import useChessContext from "../hooks/use-chess-context";
import './chessSquare.scss';

function ChessSquare({ square, id, showPossibleWaysClass }) {
    const { setWhiteKingID, setBlackKingID, whiteKing, 
            blackKing, order, check, board, setCastleWhite, setCastleBlack } = useChessContext();

    const targetMove = (showPossibleWaysClass) => {
        if (square.f != '' && showPossibleWaysClass[0] === id) {
            return 'dot_enemy';
        } else if (square.f === '' && showPossibleWaysClass[0] === id) {
            return 'dot';
        } else {
            return '';
        }
    }

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
        <div className={`chessSquare w-full h-full flex items-center justify-center relative
                        ${square.c === 0 ? 'bg-[#788592]' : 'bg-[#242D38]'}
                        ${targetMove(showPossibleWaysClass)}
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