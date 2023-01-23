import Piece from "react-chess-pieces";
import './chessSquare.css';

function ChessSquare({ square, id }) {
    


    return (
        <div 
        className={`w-12 h-12 flex items-center justify-center ${square.c === 0 ? 'bg-amber-200' : 'bg-amber-700'}`}
        id={id}>
            <span>{square.f}</span> 
            <Piece piece={square.f} />
        </div>
    )
}

export default ChessSquare;