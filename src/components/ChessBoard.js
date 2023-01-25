import useChessContext from "../hooks/use-chess-context";
import ChessSquare from "./ChessSquare";
import "./chessBoard.css";

function ChessBoard() {
    const {board, pieceID, setPieceID, setPieceName, showPossibleWays, movePiece} = useChessContext();

    /* Отримує компонент клітинки та відповідає за її рух*/
    const getPiece = (chessPiece) => {
        if (pieceID === "" && chessPiece.firstChild.innerHTML === "") return;
        if (chessPiece.classList.contains("dot")) movePiece(chessPiece.id);

        setPieceID(chessPiece.id);
        setPieceName(chessPiece.firstChild.innerHTML);
    };

    /* Відповідає за рух фігури */

    /* Приймає масив з числами, які вказують на можливі рухи фігури та сортує по клітинкам, які в подальшому будуть підсвічуватися */
    function addLabelForClass(id, showPossibleWays) {
        return showPossibleWays.filter(item => item === id)
    }

    const renderBoard = board.map((item, rowIndex) => {
        return (
            <div className="grid grid-cols-8 justify-items-center relative" 
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