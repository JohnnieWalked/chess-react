import useChessContext from "../hooks/use-chess-context";
import ChessSquare from "./ChessSquare";
import PlayerBar from "./PlayerBar";
import Piece from "react-chess-pieces";
import "./chessBoard.scss";

function ChessBoard() {
    const { board, pieceID, setPieceID, setPieceName, showPossibleWays, movePiece, clearState, order, promotion, getPromotedPiece } = useChessContext();

    /* Gets the square component and is responsible for its movement, also allows you to cancel the move and responsible for player's order */
    const getPiece = (chessPiece) => {
        console.log("GET PIECE");
        let pieceTargetName = chessPiece.firstChild.innerHTML;
        if (pieceID === "" && pieceTargetName === "") return;
        if (pieceID != "" && pieceTargetName === "") clearState(); 

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
                ${promotion ? "pointer-events-none blur-[.2rem]" : 'pointer-events-auto blur-0'}`} 
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

const PromotionBar = ({getPromotedPiece, order}) => {
    let pieces = ['R', 'N', 'B', 'Q'];
    if (!order) pieces = pieces.map(item => item.toLowerCase());

    const renderItems = pieces.map((item, i) => {
        return (
            <div onClick={(e) => getPromotedPiece(e)} className="w-16 h-14" key={i}>
                <span className="hidden">{item}</span>
                <Piece piece={item} />
            </div>
        )
    })

    return (
        <div className="promotionBar text-[1.2rem] text-center text-sky-50 mt-3 mb-3">
            <div>Pawn Promotion Bar</div>
            <div className="w-full h-14 flex items-center justify-center bg-skyrim-bar bg-contain bg-center bg-no-repeat">
                {renderItems}
            </div>
        </div>
    )
}


export default ChessBoard;