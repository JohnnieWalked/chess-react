import { useState, useEffect } from "react";
import useChessContext from "../../hooks/use-chess-context";
import ChessSquare from "../chessboard-square/ChessSquare";
import PromotionBar from "../chessboard-promoBar/PromotionBar";
import Modal from "../modal/Modal";

import "./chessBoard.scss";


function ChessBoard({ rotate, oldBoard, showOldBoard, coordinates }) {
    const { board, pieceID, setPieceID, setPieceName, showPossibleWays, movePiece, clearState, order, promotion, getPromotedPiece, checkmate, setCheckmate, restart, move } = useChessContext();

    /* part of rotate animation */
    const [show, setShow] = useState(true);

    const col = ['a', 'b', 'c', 'd', 'e', 'f', 'j', 'h'];
    const row = ['1', '2', '3', '4', '5', '6', '7', '8'];

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

    /* gets coordinates from sessionStorage in format (e2-e4) and retrieves it to XY */
    const fromE2E4toXY = (coordinates) => {
        let newStr = coordinates.replace(/-/g, "");
        newStr = newStr.substring(newStr.length - 4);
        const oldCol = fromE2E4toXYHelper(newStr[0]),
              oldRow = Number(newStr[1]) - 1,
              currCol = fromE2E4toXYHelper(newStr[2]),
              currRow = Number(newStr[3]) - 1;
        return [`${oldRow}` + `${oldCol}`, `${currRow}` + `${currCol}`];
    }

    const fromE2E4toXYHelper = (item) => {
        const coordinatesTemplate = ['a', 'b', 'c', 'd', 'e', 'f', 'j', 'h'];
        for (let i = 0; i < coordinatesTemplate.length; i++) {
            if (item === coordinatesTemplate[i]) {
                return i;
            }
        }
    }
        
    const renderBoard = (board) => { 
        return board.map((item, rowIndex) => {
            return (
                <div className={`board-row grid grid-cols-8 relative 
                    ${promotion || checkmate || showOldBoard ? "pointer-events-none" : 'pointer-events-auto'}`} 
                    key={rowIndex} 
                    onClick={(e) => getPiece(e.target)}
                > 
                    {item.map((square, colIndex) => {
                        let id = [rowIndex]+[colIndex];
                        if (coordinates) fromE2E4toXY(coordinates);
                        return (
                            <ChessSquare 
                                key={id} 
                                id={id} 
                                square={square} 
                                showPossibleWaysClass={addLabelForClass(id, showPossibleWays)} 
                                rotate={rotate}
                                move={coordinates && showOldBoard ? fromE2E4toXY(coordinates) : move}
                            />
                        )
                    })}
                </div>
            )
        })
    }

    useEffect(() => {
        setShow(false);
        setTimeout(() => {
            setShow(true)
        }, 800)
    }, [rotate])

    return (
        <div>
            <div className="row">
                {row.map((item, i) => {return <span className="board-col" key={i}>{item}</span>})}
            </div> 
            <div className={`board-container`}>
                <div className={`board grid self-center justify-items-center z-10 relative
                                ${rotate ? 'rotate_active' : ''}
                                ${show ? 'rotate_active_show' : 'rotate_active_hide'}
                                ${showOldBoard ? 'oldBoardState' : ''} `}>
                    {showOldBoard ? renderBoard(oldBoard).reverse() : renderBoard(board).reverse()}
                </div>
                <div className={`absolute w-full h-full top-0 flex self-center justify-center`}>
                    {checkmate ? 
                        <Modal> 
                            <div className="modal_header tracking-[0.045rem]">
                                {!order ? "White wins" : "Black wins"}
                                <div className="">Rematch?</div>
                            </div>
                            <div className="modal_content mt-12 flex w-1/2 justify-around z-10">
                                <span className="choice" onClick={restart}>Yes</span>
                                <span className="choice" onClick={() => setCheckmate(false)}>No</span>
                            </div>
                        </Modal> 
                    : null}
                    {promotion ? <PromotionBar order={order} getPromotedPiece={getPromotedPiece} /> : false}
                </div>
            </div>
            
            <div className="col">
                {col.map((item, i) => {return <span className="board-col" key={i}>{item}</span>})}
            </div>  
        </div>
    );
}

export default ChessBoard;