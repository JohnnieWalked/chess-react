import useChessContext from "../hooks/use-chess-context";
import ChessSquare from "./ChessSquare";
import "./chessBoard.css";
import { useEffect } from "react";

function ChessBoard() {
    const {board, pieceID, pieceName, setPieceID, setPieceName, showPossibleWays, movePiece, clearState} = useChessContext();

    /* Отримує компонент клітинки та відповідає за її рух, а також дозволяє відмінити хід*/
    const getPiece = (chessPiece) => {
        if (pieceID === "" && chessPiece.firstChild.innerHTML === "") return;
        if (pieceID != "" && chessPiece.firstChild.innerHTML === "") clearState();
        if (chessPiece.classList.contains("dot")) movePiece(chessPiece.id);
        setPieceID(chessPiece.id);
        setPieceName(chessPiece.firstChild.innerHTML);
    };

    /* Приймає масив з числами, які вказують на можливі рухи фігури та сортує по клітинкам, які в подальшому будуть підсвічуватися */
    function addLabelForClass(id, showPossibleWays) {
        return showPossibleWays.filter(item => item === id)
    }

    const renderBoard = board.map((item, rowIndex) => {
        return (
            <div className="grid grid-cols-8 relative" 
            key={rowIndex} 
            onClick={(e) => getPiece(e.target)}> 
                {item.map((square, colIndex) => {
                    let id = [rowIndex]+[colIndex];
                    return (
                        <ChessSquare 
                            key={id} 
                            id={id} 
                            square={square} 
                            showPossibleWaysClass={addLabelForClass(id, showPossibleWays)} 
                        />
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