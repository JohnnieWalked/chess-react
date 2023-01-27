import useChessContext from "../hooks/use-chess-context";
import Piece from "react-chess-pieces";
import './chessSquare.css';

function ChessSquare({ square, id, showPossibleWaysClass }) {
    const {order} = useChessContext();


    return (
        <div 
        className={`
            w-12 h-12 flex items-center justify-center relative
            ${square.c === 0 ? 'bg-amber-200' : 'bg-amber-700'} 
            ${showPossibleWaysClass.length != 0 ? 'dot' : ''}
            `}
        id={id}>
            <span>{square.f}</span> 
            <Piece piece={square.f} />
        </div>
    )
}

export default ChessSquare;