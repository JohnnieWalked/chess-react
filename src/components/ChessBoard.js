import useChessContext from "../hooks/use-chess-context";
import ChessSquare from "./ChessSquare";
import "./chessBoard.css";

function ChessBoard() {
    const { board, pieceID, setPieceID, setPieceName, showPossibleWays, movePiece, clearState, order } = useChessContext();

    /* Gets the square component and is responsible for its movement, also allows you to cancel the move and responsible for player's order */
    const getPiece = (chessPiece) => {
        console.log("GET PIECE");
        let pieceTargetName = chessPiece.firstChild.innerHTML;
        if (pieceID === "" && pieceTargetName === "") return;
        if (pieceID != "" && pieceTargetName === "") clearState(); 

        if (chessPiece.classList.contains("dot")) movePiece(chessPiece.id);

        if (order && /[a-z]/.test(pieceTargetName)) return; 
        if (!order && /[A-Z]/.test(pieceTargetName)) return;

        setPieceID(chessPiece.id);
        setPieceName(pieceTargetName);
    };

    /* Accepts an array with numbers that indicate the possible movements of the figure and sorts by squares, which will be highlighted in the future */
    function addLabelForClass(id, showPossibleWays) {
        return showPossibleWays.filter(item => item === id);
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
        <div className="w-[28rem] h-[28rem] grid self-center">
            {renderBoard}
        </div>
    );
}


export default ChessBoard;