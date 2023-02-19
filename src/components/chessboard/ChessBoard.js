import useChessContext from "../../hooks/use-chess-context";
import ChessSquare from "../chessboard-square/ChessSquare";
import PromotionBar from "../chessboard-promoBar/PromotionBar";
import "./chessBoard.scss";
import { useState, useEffect } from "react";

function ChessBoard({ rotate }) {
    const { board, pieceID, setPieceID, setPieceName, showPossibleWays, movePiece, clearState, order, promotion, getPromotedPiece, checkmate, setCheckmate, restart } = useChessContext();

    const [show, setShow] = useState(true);

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
                            rotate={rotate}
                        />
                    )
                })}
            </div>
        )
    });

    useEffect(() => {
        setShow(false);
        setTimeout(() => {
            setShow(true)
        }, 800)
    }, [rotate])

    return (
        <div className={`rotate-container w-[400px] h-[400px]`}>
            <div className={`rotate grid self-center justify-items-center z-0 relative
                             ${rotate ? 'rotate_active' : ''}
                             ${show ? 'rotate_active_show' : 'rotate_active_hide'} `}>
                {renderBoard.reverse()}
                {checkmate ? <Modal 
                             order={order} 
                             setCheckmate={setCheckmate}
                             restart={restart} /> : null}
            </div>
        {promotion ? <PromotionBar order={order} getPromotedPiece={getPromotedPiece} /> : false}
        </div>
    );
}

/*  modal window ----------------------------------------------------------------------  */
const Modal = ({order, setCheckmate, restart}) => {

    return (
        <div className="modal-choice w-[91%] h-1/2 absolute flex flex-col justify-center items-center self-center bg-skyrim-modal bg-center bg-contain bg-no-repeat backdrop-blur-[.2rem] text-zinc-400 text-center">
            <div className="tracking-[0.045rem]">
                {!order ? "White wins" : "Black wins"}
                <div className="">Rematch?</div>
            </div>
            <div className="mt-12 flex w-1/2 justify-around z-10">
                <span onClick={restart}>Yes</span>
                <span onClick={() => setCheckmate(false)}>No</span>
            </div>
        </div>
    )
}

export default ChessBoard;