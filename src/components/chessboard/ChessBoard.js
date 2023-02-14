import useChessContext from "../../hooks/use-chess-context";
import ChessSquare from "../chessboard-square/ChessSquare";
import PromotionBar from "../chessboard-promoBar/PromotionBar";
import PlayerBar from "../chessboard-playerBar/PlayerBar";
import "./chessBoard.scss";

function ChessBoard() {
    const { board, pieceID, setPieceID, setPieceName, showPossibleWays, movePiece, clearState, order, promotion, getPromotedPiece, checkmate } = useChessContext();

    /* Gets the square component and is responsible for its movement, also allows you to cancel the move and responsible for player's order */
    const getPiece = (chessPiece) => {
        console.log("GET PIECE");
        let pieceTargetName = chessPiece.firstChild.innerHTML;
        if (pieceID === "" && pieceTargetName === "") return;
        if (pieceID !== "" && pieceTargetName === "") clearState(); 

        if (chessPiece.classList.contains("dot")
            || chessPiece.classList.contains("dot_enemy")) movePiece(chessPiece.id);

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
            <div className={`grid grid-cols-8 relative 
                ${promotion || checkmate ? "pointer-events-none blur-[.2rem]" : 'pointer-events-auto blur-0'}`} 
                key={rowIndex} 
                onClick={(e) => getPiece(e.target)}
            > 
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
        <div className="chessboard w-[30rem]">
            <PlayerBar />
                <div className="grid self-center z-0">
                    {/* order ? renderBoard.reverse() : */ renderBoard}
                </div>
            {promotion ? <PromotionBar order={order} getPromotedPiece={getPromotedPiece} /> : false}
            <PlayerBar />
        </div>
    );
}

export default ChessBoard;