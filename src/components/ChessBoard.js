import { useEffect } from "react";
import useChessContext from "../hooks/use-chess-context";
import ChessSquare from "./ChessSquare";
import "./chessBoard.css";

function ChessBoard() {
    const {board, getPiece} = useChessContext();
    

    const renderBoard = board.map((item, rowIndex) => {
        return (
            <div className="grid grid-cols-8 justify-items-center" 
            key={rowIndex} 
            onClick={(e) => getPiece(e.target)}> 
                {item.map((square, colIndex) => {
                    return (
                        <ChessSquare key={[rowIndex]+[colIndex]} id={[rowIndex]+[colIndex]} square={square} />
                    )
                })}
            </div>
        )
    });

    return (
        <div className="grid justify-items-center m-auto">
            {renderBoard}
        </div>
    );
}


export default ChessBoard;