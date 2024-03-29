import { createContext, useEffect, useState } from "react";
import pawn from "../pieceMovement/pawn";
import knight from "../pieceMovement/knight";
import bishop from "../pieceMovement/bishop";
import rook from "../pieceMovement/rook";
import queen from "../pieceMovement/queen";
import king from "../pieceMovement/king";
import isCheck from "../utils/isCheck";
import { checkCastle } from "../utils/castling";
import moveNotation from "../utils/moveNotation";

const ChessContext = createContext();

const BOARD_TEMPLATE = [
    [{c: 0, f: 'R'}, {c: 1, f: 'N'}, {c: 0, f: 'B'}, {c: 1, f: 'Q'},
    {c: 0, f: 'K'}, {c: 1, f: 'B'}, {c: 0, f: 'N'}, {c: 1, f: 'R'}],
    [{c: 1, f: 'P'}, {c: 0, f: 'P'}, {c: 1, f: 'P'}, {c: 0, f: 'P'}, 
    {c: 1, f: 'P'}, {c: 0, f: 'P'}, {c: 1, f: 'P'}, {c: 0, f: 'P'}],

    [{c: 0, f: ''}, {c: 1, f: ''}, {c: 0, f: ''}, {c: 1, f: ''}, 
    {c: 0, f: ''}, {c: 1, f: ''}, {c: 0, f: ''}, {c: 1, f: ''}],
    [{c: 1, f: ''}, {c: 0, f: ''}, {c: 1, f: ''}, {c: 0, f: ''}, 
    {c: 1, f: ''}, {c: 0, f: ''}, {c: 1, f: ''}, {c: 0, f: ''}],
    [{c: 0, f: ''}, {c: 1, f: ''}, {c: 0, f: ''}, {c: 1, f: ''}, 
    {c: 0, f: ''}, {c: 1, f: ''}, {c: 0, f: ''}, {c: 1, f: ''}],
    [{c: 1, f: ''}, {c: 0, f: ''}, {c: 1, f: ''}, {c: 0, f: ''}, 
    {c: 1, f: ''}, {c: 0, f: ''}, {c: 1, f: ''}, {c: 0, f: ''}],

    [{c: 0, f: 'p'}, {c: 1, f: 'p'}, {c: 0, f: 'p'}, {c: 1, f: 'p'}, 
    {c: 0, f: 'p'}, {c: 1, f: 'p'}, {c: 0, f: 'p'}, {c: 1, f: 'p'}],
    [{c: 1, f: 'r'}, {c: 0, f: 'n'}, {c: 1, f: 'b'}, {c: 0, f: 'q'}, 
    {c: 1, f: 'k'}, {c: 0, f: 'b'}, {c: 1, f: 'n'}, {c: 0, f: 'r'}],
];

function Provider({ children }) {

    /* responsible for numbering in move notation */
    const [counter, setCounter] = useState(1);

    /* chess field (white - capital letters, black - small) */
    /* First parameter - row, second - column */
    const [board, setBoard] = useState(BOARD_TEMPLATE);

    /* watch kings locations (id) */
    const [whiteKing, setWhiteKingID] = useState();
    const [blackKing, setBlackKingID] = useState();

    /* responsible for castling; idea - rook1, rook2; 
        BUT if black/white king makes first move - set castling to "FALSE" */
    const [rooksCastleWhite, setRooksCastleWhite] = useState([true, true]);
    const [rooksCastleBlack, setRooksCastleBlack] = useState([true, true]);
    
    /* resposible for showing a check */
    const [check, setCheck] = useState(false);

    /* responsible for showing a checkmate or stalemate */
    const [end, setEnd] = useState(false);

    /* Responsible for showing possible paths */
    const [showPossibleWays, setShowPossibleWays] = useState([]);
    
    /* Responsible for the order of movement of players (true - white's, false - black's) */
    const [order, setOrder] = useState(true);

    /* Responsible for selecting the figure in the square */
    const [pieceID, setPieceID] = useState('');
    const [pieceName, setPieceName] = useState('');   
    
    /* En passant state and XY for possible pawn's attack move */
    const [passant, setPassant] = useState([false, ''])

    /* pawn promotion */
    const [promotion, setPromotion] = useState(false);

    /* show past and current position of piece */
    const [move, setMove] = useState([]);

    const algorithmSelection = (item, xy) => {
        let temp = item.toLowerCase();
        switch (temp) {
            case 'p': temp = pawn(item, xy, board, passant); /* console.log("pawn", temp); */
                return preventCheck(item, xy, temp);

            case 'r': temp = rook(item, xy, board); /* console.log("rook", temp); */ 
                return preventCheck(item, xy, temp);

            case 'n': temp = knight(item, xy, board); /* console.log("knight", temp); */ 
                return preventCheck(item, xy, temp);

            case 'b': temp = bishop(item, xy, board); /* console.log("bishop", temp); */
                return preventCheck(item, xy, temp);

            case 'q': temp = queen(item, xy, board); /* console.log("queen", temp); */ 
                return preventCheck(item, xy, temp);

            case 'k': if (check) { temp = king(item, xy, board) } 
                      else { temp = king(item, xy, board, rooksCastleWhite, rooksCastleBlack) } 
                      /* console.log("king", temp); */ 
                      return preventCheck(item, xy, temp);
            default: return;
        }
    };

    useEffect(() => {
        // console.log('algorithm selection...');
        algorithmSelection(pieceName, pieceID);
    }, [pieceName, pieceID]);

    /* preventCheck() sorts possible movements to avoid the check */
    const preventCheck = (pieceName, pieceID, possibleWays) => {
        const oldAxisX = pieceID[0],
              oldAxisY = pieceID[1];

        let preventCheckMoves = possibleWays.map(xy => {
            const newAxisX = xy[0],
                  newAxisY = xy[1];
            let newBoard = JSON.parse(JSON.stringify([...board]));
            newBoard[newAxisX][newAxisY].f = newBoard[oldAxisX][oldAxisY].f;
            newBoard[oldAxisX][oldAxisY].f = '';

            /* 
                responsible for king's movement to avoid checks. 
                    isCheck() is responsible for watching checks by pieces, 
                    king() is responsible for keeping distance between kings

                logic: if possible king's move has a threat from enemy piece OR 
                not keeping distance between kings - returns "", else returns possible move
            */
            if (pieceName === 'k' || pieceName === 'K') {
                if (isCheck(pieceName, xy, newBoard) 
                    || king(pieceName, xy, newBoard) === true) {
                    return '';
                } else {
                    return xy;
                }
            }
            
            /* 
            responsible for allied pieces' movement to avoid the check
                the main difference between function above - is static king, we choose only allied pieces
            */
            if (/[P,R,N,B,Q]/.test(pieceName)) {
                if (!isCheck("K", whiteKing, newBoard)) {
                    return xy;
                } else {
                    return "";
                }
            } else if (/[p,r,n,b,q]/.test(pieceName)) {
                if (!isCheck("k", blackKing, newBoard)) {
                    return xy;
                } else {
                    return "";
                }
            }
        });

        /* visit file "castling.js" for explanation */
        if (pieceName === "K" && rooksCastleWhite !== false) {
            preventCheckMoves = checkCastle(rooksCastleWhite[0], preventCheckMoves, "02", "03");
            preventCheckMoves = checkCastle(rooksCastleWhite[1], preventCheckMoves, "06", "05");
        } else if (pieceName === "k" && rooksCastleBlack !== false) {
            preventCheckMoves = checkCastle(rooksCastleBlack[0], preventCheckMoves, "72", "73");
            preventCheckMoves = checkCastle(rooksCastleBlack[1], preventCheckMoves, "76", "75");
        }

        preventCheckMoves = preventCheckMoves.filter(item => item !== "");

        // console.log('preventCheck', preventCheckMoves);
        setShowPossibleWays(preventCheckMoves);
        return preventCheckMoves;
    }

    const movePiece = (chessPieceID) => {
        // console.log("MOVE PIECE");
        const oldAxisX = Number(pieceID[0]),
              oldAxisY = Number(pieceID[1]),
              newAxisX = Number(chessPieceID[0]),
              newAxisY = Number(chessPieceID[1]);

        /* watch for rook's move. if it is the first rook's move - set castle value of this rook to "false" */
        if (rooksCastleWhite !== false && rooksCastleBlack !== false) {
            let newCastleWhite = [...rooksCastleWhite],
                newCastleBlack = [...rooksCastleBlack];
            if (pieceName === 'R') {
                if (pieceID === '00') {
                    newCastleWhite[0] = false;
                    setRooksCastleWhite(newCastleWhite);
                } else if (pieceID === '07') {
                    newCastleWhite[1] = false;
                    setRooksCastleWhite(newCastleWhite);
                }
            } else if (pieceName === "r") {
                if (pieceID === '70') {
                    newCastleBlack[0] = false;
                    setRooksCastleBlack(newCastleBlack);
                } else if (pieceID === '77') {
                    newCastleBlack[1] = false;
                    setRooksCastleBlack(newCastleBlack);
                }
            }
        }        

        let newBoard = JSON.parse(JSON.stringify([...board]));
        newBoard[newAxisX][newAxisY].f = newBoard[oldAxisX][oldAxisY].f;
        newBoard[oldAxisX][oldAxisY].f = '';

        /* 
            en passant logic: if pawn has just made an initial two-square advance, 
            we set passant status to "TRUE" and receive coordinates of this pawn with shift axis X +- 1
            (depends on color); 
            Literally, we just receive the square behind the pawn, that has just made an initial two-square advance.
        */
        if (passant[0] && `${newAxisX}` + `${newAxisY}` === passant[1]) {
            if (pieceName === 'P' && newBoard[newAxisX - 1][newAxisY].f !== "") {
                newBoard[newAxisX - 1][newAxisY].f = "";
            }
            else if (pieceName === 'p' && newBoard[newAxisX + 1][newAxisY].f !== "") {
                newBoard[newAxisX + 1][newAxisY].f = "";
            }
        }
        if (pieceName === 'P' && oldAxisX + 2 === newAxisX) {
            setPassant([true, `${newAxisX - 1}${newAxisY}`]);
        } else if (pieceName === 'p' && (oldAxisX - 2 === newAxisX)) {
            setPassant([true, `${newAxisX + 1}${newAxisY}`]);
        } else {
            setPassant([false, ``]);
        }

        /* finish castling at newBoard */
        if (pieceName === 'K' && rooksCastleWhite !== false) {
            if (chessPieceID === '02') {newBoard[0][3].f = newBoard[0][0].f; newBoard[0][0].f = '';} 
            if (chessPieceID === '06') {newBoard[0][5].f = newBoard[0][7].f; newBoard[0][7].f = '';} 
            setBoard(newBoard);
        } else 
        if (pieceName === 'k' && rooksCastleBlack !== false) {
            if (chessPieceID === '72') {newBoard[7][3].f = newBoard[7][0].f; newBoard[7][0].f = '';} 
            if (chessPieceID === '76') {newBoard[7][5].f = newBoard[7][7].f; newBoard[7][7].f = '';}
            setBoard(newBoard); 
        }
        else {
            setBoard(newBoard);
        }

        /* responsible for highlighting a move */
        setMove([pieceID, chessPieceID]);

        /* Pawn Promotion */
        if (pieceName === 'P' && newAxisX === 7) {
            return setPromotion(true);
        } else if (pieceName === 'p' && newAxisX === 0) {
            return setPromotion(true);
        }

        /* 
            responsible for calculating a check. 
            if the order is 'true', white king can NOT be checked, isCheck() will calculate if black king was checked. 
            if the order is 'false', black king can NOT be checked, isCheck() will calculate if white king was checked 
        */
        setCheck(!order ? isCheck('K', whiteKing, newBoard) : isCheck('k', blackKing, newBoard));

        /* responsible for storage a move history */
        moveNotation([pieceID, chessPieceID], newBoard, counter);
        setCounter(counter + 1);

        /* after move - change order */
        setOrder(!order);
    };

    /* gets a piece the player selected on a promotion bar and refresh the board */
    const getPromotedPiece = (value) => {
        const target = value.target.parentNode.children[0].innerHTML;

        let newBoard = JSON.parse(JSON.stringify([...board]));
        newBoard[7] = newBoard[7].map(item => {
            if (item.f === 'P') item.f = target;
            return item;
        })

        newBoard[0] = newBoard[0].map(item => {
            if (item.f === 'p') item.f = target;
            return item;
        })

        setBoard(newBoard);
        setPromotion(false);
        setCheck(!order ? isCheck('K', whiteKing, newBoard) : isCheck('k', blackKing, newBoard));
        /* responsible for storage a move history */
        moveNotation(move, newBoard, counter);
        setCounter(counter + 1);
        setOrder(!order);
    }

    /* 
    responsible for calculating a checkmate and stalemate; endGame() looks through a board and 
        finds all moves to prevent check; if array of moves is empty and check is TRUE - means checkmate;
        else if check is FALSE - means stalemate  
    */
    const endGame = (board, reg) => {
        const possibleMoves = [];
        board.forEach((row, rowIndex) => row.forEach((square, colIndex) => {
            if (reg.test(square.f)) {
                let xy = [rowIndex]+[colIndex];
                possibleMoves.push(algorithmSelection(square.f, xy));
            }
        }));
        if (check && possibleMoves.flat().length === 0) setEnd(true);
        if (!check && possibleMoves.flat().length === 0) setEnd('Stalemate');
    }

    /* checks for stalemate and checkmate. trigger by any move on the chessboard */
    useEffect(() => {
        if (!order) {
            endGame(board, /[a-z]/);
        } else if (order) {
            endGame(board, /[A-Z]/);
        }
    }, [order])

    function clearState() {
        setPieceID('');
        setPieceName('');
        setShowPossibleWays([]);
    }

    useEffect(() => {
        // console.log('clear state');
        clearState();
    }, [board]);

    function restart() {
        clearState();
        setBoard(BOARD_TEMPLATE);
        setRooksCastleWhite([true, true]);
        setRooksCastleBlack([true, true]);
        setCheck(false);
        setEnd(false);
        setOrder(true);
        setMove([]);
        setPassant([false, '']);
        setCounter(1);
        sessionStorage.clear()
    }

    return (
        <ChessContext.Provider value={{board, setBoard, pieceID, pieceName, setPieceID, setPieceName, showPossibleWays, movePiece, clearState, order, setWhiteKingID, setBlackKingID, whiteKing, blackKing, check, setRooksCastleWhite, setRooksCastleBlack, promotion, getPromotedPiece, end, setEnd, restart, move, endGame, isCheck}}>
            {children}
        </ChessContext.Provider>
    )
}

export { Provider };
export default ChessContext;