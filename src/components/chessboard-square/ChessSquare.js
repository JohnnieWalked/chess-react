import { useEffect } from "react";
import Piece from "react-chess-pieces";
import useChessContext from "../../hooks/use-chess-context";
import './chessSquare.scss';

function ChessSquare({ square, id, showPossibleWaysClass, rotate, move }) {
    const { setWhiteKingID, setBlackKingID, whiteKing, 
            blackKing, order, check, board, setRooksCastleWhite, setRooksCastleBlack } = useChessContext();

    /* responsible for toggling class - if allied piece is about to hit an enemy piece  */
    const targetMove = (showPossibleWaysClass) => {
        if (square.f !== '' && showPossibleWaysClass[0] === id) {
            return 'dot_enemy';
        } else if (square.f === '' && showPossibleWaysClass[0] === id) {
            return 'dot';
        } else {
            return '';
        }
    }

    useEffect(() => {
        if (square.f === "K") {
            /* if white king makes first move, set castling to "FALSE" 
                - (visit context/chess.js for more explanation) */
            if (whiteKing !== id && whiteKing !== undefined) {
                setRooksCastleWhite(false);
            }
            setWhiteKingID(id);
        } 
        if (square.f === "k") {
            /* if black king makes first move, set castling to "FALSE"
                - (visit context/chess.js for more explanation) */
            if (blackKing !== id && blackKing !== undefined) {
                setRooksCastleBlack(false);
            }
            setBlackKingID(id);
        }
    }, [board]);
    
    return (
        <div className={`chessSquare w-full h-full flex items-center justify-center relative
                        ${square.c === 1 ? 'bg-[#788592]' : 'bg-[#242D38]'}
                        ${targetMove(showPossibleWaysClass)}
                        ${order && check && id === whiteKing ? 'check' : ''}
                        ${!order && check && id === blackKing ? 'check' : ''}
                        ${rotate ? `chessSquare_rotate` : ''}
                        ${move[0] === id ? 'pastPosition' : ''}
                        ${move[1] === id ? 'currentPosition' : ''}
                        `}
        id={id}>
            <span>{square.f}</span> 
            <Piece piece={square.f} />
        </div>
    )
}

export default ChessSquare;